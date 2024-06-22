const puppeteer = require("puppeteer");
const format = require("./AutoFormatter.js");
require("dotenv").config();
(async () => {
  const PARSEURL = process.env.PARSE_URL;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${PARSEURL}`);
  // Parse all product cards links on the page
  let arr = await page.evaluate(() => {
    let links = Array.from(
      document.querySelectorAll(".product-thumb-link"),
      (link) => link.href
    );
    return links.map((link) => ({ Link: link }));
  });
  // Start parsing every card
  let ProductImagesCards = [];
  for (let linkNumber = 1; linkNumber < 2; linkNumber += 1) {
    const itemPage = await browser.newPage();
    await itemPage.goto(arr[linkNumber].Link);

    // Product Card parse and autoformat
    let { ProductImagesCard, imagesSrcList } = await itemPage.evaluate(
      (linkNumber) => {
        try {
          let titleDetails =
            document.querySelector(".pdp-header-title").innerText;

          let details = document.querySelector(
            ".pdp-content-section-body"
          ).children;

          function getUniqueImagesUrl(hero, productImagesElem) {
            const elements = Array.from(productImagesElem);
            let uniqueSrcSet = new Set();
            if (hero) {
              const heroSrc = hero.getAttribute("src");
              if (heroSrc) {
                const bigHeroSrc = heroSrc.replace("/80/", "/700/");
                uniqueSrcSet.add(bigHeroSrc);
              }
            }
            elements.forEach((element) => {
              const src = element.getAttribute("src");
              if (
                src &&
                src.indexOf("youtube") === -1 &&
                src.indexOf("clone") === -1
              ) {
                const bigSrc = src.replace("/80/", "/700/");
                uniqueSrcSet.add(bigSrc);
              }
            });
            if (uniqueSrcSet.size < 1) {
              elements.forEach((element) => {
                const src = element.getAttribute("src");
                if (src) {
                  const bigSrc = src.replace("/80/", "/700/");
                  uniqueSrcSet.add(bigSrc);
                }
              });
            }
            return Array.from(uniqueSrcSet);
          }

          function skuGen(name) {
            let sum = 0;
            for (let i = 0; i < name.length; i++) {
              sum += name.charCodeAt(i);
            }
            return sum;
          }
          let productImageElements = document.querySelectorAll(
            ".pdp-hero-alt-thumb"
          );
          let productHeroImageElement = document.querySelector(
            ".pdp-hero-image.active"
          );
          let imagesNumber = getUniqueImagesUrl(
            productHeroImageElement,
            productImageElements
          ).length;
          let imagesSrcList = getUniqueImagesUrl(
            productHeroImageElement,
            productImageElements
          );
          let variantsNum = document.querySelectorAll(
            ".spec-table thead td"
          ).length;
          console.log("iter", linkNumber, "images", imagesNumber);
          let imagesRowNumber;
          imagesRowNumber = imagesNumber;

          let ProductImagesCard = [];
          for (let i = 0; i < imagesRowNumber; i += 1) {
            let imageCard = [
              { dataObject: "data-object", variant: "image" },
              { key: "key", keyValue: `KeySnowboard00${linkNumber}` },
              {
                variantSku: "variants.sku",
                variantSkuValue: `SKU-SNW-${skuGen(
                  titleDetails.replace(/Snowboard.*$/, "")
                )}`,
              },
              {
                variantsKey: "variants.key",
                variantKeyValue: `VariantKeySNW-${skuGen(
                  titleDetails.replace(/Snowboard.*$/, "")
                )}`,
              },
              {
                variantsNameEn: "variants.images.label",
                variantsNameEnValue: `SNW-Image${linkNumber}-0${i + 1}`,
              },
              {
                uri: "variants.images.url",
                uriValue: `https://raw.githubusercontent.com/ksarise/parser/main/assets/SNW-${linkNumber}-01/${i}.jpg`,
              },
              {
                width: "variants.images.dimensions.w",
                widthValue: "700",
              },
              {
                height: "variants.images.dimensions.h",
                widthValue: "700",
              },
            ];
            let dataArray = imageCard.map((obj) => Object.values(obj));
            ProductImagesCard.push(dataArray);
          }

          for (let i = 0; i < variantsNum; i += 1) {
            let variantCard = [
              { dataObject: "data-object", variant: "variant" },
              { key: "key", keyValue: `KeySnowboard10${linkNumber}` },
              {
                variantSku: "variants.sku",
                variantSkuValue: `SKU-SNW-${skuGen(
                  titleDetails.replace(/Snowboard.*$/, "")
                )}-000${i + 1}`,
              },
              {
                variantsKey: "variants.key",
                variantKeyValue: `VariantKeySNW-${skuGen(
                  titleDetails.replace(/Snowboard.*$/, "")
                )}-000${i + 1}`,
              },
              {
                variantsNameEn: "variants.images.label",
                variantsNameEnValue: `SNW-Image${linkNumber}-0${i + 1}-000${
                  i + 1
                }`,
              },
              {
                uri: "variants.images.url",
                uriValue: `https://raw.githubusercontent.com/ksarise/parser/main/assets/SNW-${linkNumber}-01/0.jpg`,
              },
              {
                width: "variants.images.dimensions.w",
                widthValue: "700",
              },
              {
                height: "variants.images.dimensions.h",
                widthValue: "700",
              },
            ];
            let dataArray = variantCard.map((obj) => Object.values(obj));
            ProductImagesCard.push(dataArray);
          }
          return { ProductImagesCard, imagesSrcList };
        } catch (error) {
          console.log(linkNumber, error);
        }
      },
      linkNumber
    );
    console.log(imagesSrcList);
    itemPage.close();
    if (ProductImagesCard && ProductImagesCard.length > 0) {
      let dataArray = ProductImagesCard.map((obj) => Object.values(obj));
      ProductImagesCards.push(dataArray);
    }
    // console.log(createKeyValueArrays(ProductImagesCards));
  }
  // Preparing data for export
  function flattenArray(arrayOfArrays) {
    return arrayOfArrays.reduce((acc, curr) => acc.concat(curr), []);
  }
  format.formatAndExportData(flattenArray(ProductImagesCards), "Assets");
  await browser.close();
})();
