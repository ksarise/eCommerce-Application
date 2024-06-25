const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const format = require("./AutoFormatter.js");
const { getCategories } = require("./CategoriesFormatter.js");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.evo.com/shop/snowboard/snowboards/rpp_400");
  // Parse all product cards links on the page
  let arr = await page.evaluate(() => {
    let links = Array.from(
      document.querySelectorAll(".product-thumb-link"),
      (link) => link.href
    );
    return links.map((link) => ({ Link: link }));
  });
  // Start parsing every card
  let ProductCards = [];
  let allCategories = [];
  for (let linkNumber = 0; linkNumber < 1; linkNumber += 1) {
    try {
      const itemPage = await browser.newPage();
      await itemPage.goto(arr[linkNumber].Link);

      // Product Card parse and autoformat
      let ProductVariants = await itemPage.evaluate((linkNumber) => {
        try {
          function attribCsvFormat(str, attType) {
            const index = str.indexOf("(");
            let newStr = index !== -1 ? str.slice(0, index) : str;
            if (attType === "table") {
              return `attributes.SpecsTable_${newStr.replace(/[\s:]/g, "")}`;
            } else if (attType === "details") {
              return `attributes.Details_${newStr.replace(/[\s:]/g, "")}`;
            }
            return `attributes.Specs_${newStr.replace(/[\s:]/g, "")}`;
          }

          function tableParser(tableRows) {
            let Specs = [];

            for (
              let colIndex = 0;
              colIndex < tableRows[0].childElementCount;
              colIndex++
            ) {
              let Spec = [];
              tableRows.forEach((row) => {
                let th = row.querySelector("th");
                let td = row.querySelectorAll("td")[colIndex];

                if (th && td) {
                  let specName = attribCsvFormat(th.textContent, "table");
                  let specValue = td.textContent.trim();
                  Spec.push({ specName, specValue });
                }
              });
              if (Spec.length > 0) {
                Specs.push(Spec);
              }
            }
            return Specs;
          }
          function skuGen(name) {
            let sum = 0;
            for (let i = 0; i < name.length; i++) {
              sum += name.charCodeAt(i);
            }
            return sum;
          }
          function createProductCard(
            linkNumber,
            titleDetails,
            productDescription,
            productPrice,
            Specs,
            attribList
          ) {
            // Generate the SKU for the master variant
            const masterVariantSku = `SNW-${skuGen(
              titleDetails.replace(/Snowboard.*$/, "")
            )}`;
            let ProductVariants = [];

            // Function to create a product card
            function createProductCardTemplate(
              variantSkuValue,
              specs,
              isMaster = false,
              index
            ) {
              let variantPostKey = isMaster ? "" : `-000${index + 1}`;
              let ProductCard = [
                {
                  dataObject: "data-object",
                  variant: isMaster ? "master" : "variant",
                },
                {
                  variantSku: "variants.sku",
                  variantSkuValue: `SKU-${variantSkuValue}`,
                },
                {
                  variantPriceKey: "variants.prices.key",
                  variantPriceKeyValue: `Price${masterVariantSku}${variantPostKey}`,
                },
                {
                  currency: "variants.prices.value.currencyCode",
                  currencyValue: "USD",
                },
                {
                  valueType: "variants.prices.value.type",
                  valueTypeValue: "centPrecision",
                },
                {
                  pricesCountry: "variants.prices.country",
                  pricesCountryValue: "US",
                },
                {
                  fractionDigits: "variants.prices.value.fractionDigits",
                  fractionDigitsValue: "2",
                },
                {
                  centAmount: "variants.prices.value.centAmount",
                  centAmountValue: productPrice,
                },
                {
                  variantsKey: "variants.key",
                  variantKeyValue: `VariantKey${masterVariantSku}${variantPostKey}`,
                },
                {
                  taxCategoryKey: "taxCategory.key",
                  taxCategoryKeyValue: `SnowboardTaxKey`,
                },
              ];

              if (isMaster) {
                ProductCard.push(
                  {
                    key: "key",
                    keyValue: `KeySnowboard00${linkNumber}${variantPostKey}`,
                  },
                  {
                    productTypeKey: "productType.key",
                    productTypeKeyValue: "SnowboardProductTypeKey",
                  },
                  {
                    description: "description.en-US",
                    descriptionValue: productDescription,
                  },
                  {
                    priceMode: "priceMode",
                    priceModeValue: "Embedded",
                  },
                  {
                    productTypeId: "productType.typeId",
                    productTypeIdValue: "product-type",
                  },
                  {
                    name: "name.en-US",
                    nameValue: titleDetails.replace(/Snowboard.*$/, ""),
                  },
                  {
                    slugEn: "slug.en-US",
                    slugEnValue: titleDetails
                      .replace(/Snowboard.*$/, "")
                      .trim()
                      .replace(/[ .]/g, "-"),
                  },
                  {
                    taxCategoryTypeId: "taxCategory.typeId",
                    taxCategoryValue: "tax-category",
                  }
                );
              }

              // Add attribute elements to the product card
              attribList.forEach(({ attTitle, attDesc }) => {
                ProductCard.push({ attTitle, attDesc });
              });

              // Add specs to the product card
              specs.forEach(({ specName, specValue }) => {
                ProductCard.push({ specName, specValue });
              });

              return ProductCard;
            }

            // Create master variant product card
            let masterVariantCard = createProductCardTemplate(
              masterVariantSku,
              Specs[0],
              true
            );
            ProductVariants.push(masterVariantCard);

            // Create other variants product cards
            for (let i = 0; i < Specs.length; i++) {
              let variantSku = `SNW-${skuGen(
                titleDetails.replace(/Snowboard.*$/, "")
              )}-000${i + 1}`;
              let variantCard = createProductCardTemplate(
                variantSku,
                Specs[i],
                false,
                i
              );
              ProductVariants.push(variantCard);
            }

            return ProductVariants;
          }

          //Attributes Parser
          function attribListParser(elements, type) {
            let list = [];
            elements.forEach((elem) => {
              let titleCheck = elem.children[0].textContent.replace(
                /[\s:]/g,
                ""
              );
              if (titleCheck !== "Terrain" && titleCheck !== "AbilityLevel") {
                let attTitle = attribCsvFormat(
                  elem.children[0].textContent,
                  type
                ).replace(/\//g, "-");
                let attDesc = elem.children[1].textContent;
                list.push({ attTitle, attDesc });
              }
            });
            return list;
          }
          let titleDetails =
            document.querySelector(".pdp-header-title").innerText;
          let productDescription = document.querySelector(
            ".pdp-details-content"
          ).children[0].textContent;
          let productPrice = document
            .querySelector('meta[name="twitter:data1"]')
            .getAttribute("content")
            .replace(/\$|\./g, "");

          let attribElemList = document.querySelectorAll(".pdp-spec-list-item");
          let attribDetailsList = document.querySelectorAll(".pdp-feature");
          let attribList = attribListParser(attribElemList, "spec");
          let fullattribList = attribList.concat(
            attribListParser(attribDetailsList, "details")
          );
          let tableRows = document.querySelectorAll(".spec-table tr");
          let Specs = tableParser(tableRows);
          let ProductVariants = createProductCard(
            linkNumber,
            titleDetails,
            productDescription,
            productPrice,
            Specs,
            fullattribList
          );
          return ProductVariants;
        } catch (error) {
          console.log(linkNumber, error);
        }
      }, linkNumber);
      // Get data from script
      let scriptParse = await itemPage.evaluate(() => {
        try {
          let scripts = document.querySelectorAll("script");
          let scriptContents = Array.from(scripts).map(
            (script) => script.innerHTML
          );

          const evoDataScript = scriptContents.find((content) =>
            content.includes("var evoData")
          );

          let evoData;
          if (evoDataScript) {
            const start = evoDataScript.indexOf("{");
            const end = evoDataScript.lastIndexOf("}") + 1;
            const dataString = evoDataScript.slice(start, end);
            evoData = JSON.parse(dataString);
          }
          let specsTerrain = document.querySelector(
            ".pdp-spec-list-description"
          );
          if (!specsTerrain) {
            specsTerrain = "All-Mountain";
          } else {
            specsTerrain = specsTerrain.textContent;
          }
          let terrainCat = specsTerrain.replace(/\s/g, "").split(",");
          return {
            abilityLevel: evoData?.abilityLevel || null,
            brand: evoData?.brand.replace(/\s/g, "") || null,
            ageGroup: evoData?.ageGroup || null,
            terrain: terrainCat || null,
          };
        } catch (error) {
          console.error(`Error occurred at `, error);
        }
      });
      // Format categories
      function addKeys(key) {
        let mainCats = Array(4);
        let mainCatsString = "";
        if (key === "Key") {
          mainCats.fill("");
        } else {
          for (let i = 0; i < 4; i += 1) {
            mainCats[i] = `${Object.keys(scriptParse)[i]},`;
            mainCatsString += `${mainCats[i]};`;
          }
        }
        let terrainCatToString = "";
        for (let i = 0; i < scriptParse.terrain.length; i += 1) {
          terrainCatToString += `${mainCats[3]}${scriptParse.terrain[i]}${key}`;

          if (i < scriptParse.terrain.length - 1) {
            terrainCatToString += ";";
          }
        }
        if (!scriptParse.abilityLevel) {
          scriptParse.abilityLevel = "Intermediate-Advanced";
        }
        let productCategories = {
          categories: "categories",
          catnames: `${mainCatsString}${mainCats[0]}${
            scriptParse.abilityLevel
          }${key};${mainCats[1]}${scriptParse.brand}${key};${mainCats[2]}${
            scriptParse.ageGroup
          }${key};${terrainCatToString.trim()}`,
        };

        return productCategories;
      }

      allCategories.push(addKeys(""));
      ProductVariants.forEach((ProductCard) => {
        ProductCard.push(addKeys("Key"));
        if (ProductCard && ProductCard.length > 0) {
          let dataArray = ProductCard.map((obj) => Object.values(obj));
          ProductCards.push(dataArray);
        }
      });
      console.log(allCategories);
      itemPage.close();
    } catch (error) {
      console.error(`Error occurred at ${linkNumber}`, error);
    }
  }

  function getUniqueAttributes(data) {
    const uniqueAttributes = {};

    data.forEach((subArray) => {
      subArray.forEach((pair) => {
        const [key, value] = pair;
        if (key.startsWith("attributes.")) {
          const attributeName = key
            .split(".")[1]
            .replace(/\s/g, "")
            .replace(/[^a-zA-Z0-9\s-]/g, "-");
          if (!uniqueAttributes[attributeName]) {
            uniqueAttributes[attributeName] = new Set();
          }
          uniqueAttributes[attributeName].add(value.replace(/\s/g, ""));
        }
      });
    });
    for (const key in uniqueAttributes) {
      uniqueAttributes[key] = Array.from(uniqueAttributes[key]);
    }

    return uniqueAttributes;
  }

  const uniqueAttributes = getUniqueAttributes(ProductCards);
  function createProductDraft(uniqueAttributes) {
    const attributes = Object.keys(uniqueAttributes).map((attributeName) => {
      return {
        type: {
          name: "enum",
          values: uniqueAttributes[attributeName].map((value) => ({
            key: value.replace(/\s/g, "").replace(/[^a-zA-Z0-9\s-]/g, "-"),
            label: value,
          })),
        },
        name: `${attributeName}`
          .replace(/\s/g, "")
          .replace(/[^a-zA-Z0-9\s-_]/g, "-"),
        label: { "en-US": attributeName },
        isRequired: false,
        attributeConstraint: "None",
        isSearchable: true,
      };
    });

    return {
      key: "SnowboardProductTypeKey",
      name: "SnowboardProductType",
      description:
        "Snowboard are board where the user places both feet, usually secured, to the same board. The board itself is wider than most skis, with the ability to glide on snow.",
      attributes: attributes,
    };
  }

  const productDraft = createProductDraft(uniqueAttributes);
  fs.writeFile("output.json", JSON.stringify(productDraft, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File has been written successfully");
    }
  });
  let formattedCategories = getCategories(allCategories);
  // Preparing data for export
  console.log(ProductCards);
  function formatAttributesForEnum(mainArray) {
    return mainArray.map((subArray) => {
      return subArray.map((entry) => {
        const [key, value] = entry;
        if (key.startsWith("attributes.")) {
          const formattedValue = value
            .replace(/\s/g, "")
            .replace(/[^a-zA-Z0-9\s-]/g, "-");
          return [key, formattedValue];
        }
        return entry;
      });
    });
  }
  format.formatAndExportData(
    formatAttributesForEnum(ProductCards),
    "ProductCards"
  );
  format.formatAndExportData(formattedCategories, "Categories");
  await browser.close();
})();
