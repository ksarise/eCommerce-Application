function createProductCard(
  linkNumber,
  titleDetails,
  productDescription,
  productPrice,
  Specs,
  attribList
) {
  console.log(
    "params",
    linkNumber,
    titleDetails,
    productDescription,
    productPrice,
    Specs,
    attribList
  );
  // Generate the SKU for the master variant
  function skuGen(name) {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return sum;
  }
  const masterVariantSku = `SNW-${skuGen(titleDetails)}`;
  let ProductVariants = [];

  // Function to create a product card
  function createProductCardTemplate(variantSkuValue, specs, isMaster = false) {
    let ProductCard = [
      { dataObject: "data-object", variant: isMaster ? "master" : "variant" },
      { key: "key", keyValue: `snowboard10${linkNumber}` },
      {
        productTypeKey: "productType.key",
        productTypeKeyValue: "snowboardTypeKey",
      },
      {
        variantSku: "variants.sku",
        variantSkuValue: variantSkuValue,
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
        variantPriceKey: "variants.prices.key",
        variantPriceKeyValue: `SNW-Price-${linkNumber}-01`,
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
        productTypeId: "productType.typeId",
        productTypeIdValue: "product-type",
      },
      { name: "name.en-US", nameValue: titleDetails },
      {
        slugEn: "slug.en-US",
        slugEnValue: `snowboardSlug10${linkNumber}`,
      },
      {
        variantsKey: "variants.key",
        variantKeyValue: `SNW-${linkNumber}-01`,
      },
      {
        taxCategoryKey: "taxCategory.key",
        taxCategoryKeyValue: `SnowboardTaxKey`,
      },
      {
        taxCategoryTypeId: "taxCategory.typeId",
        taxCategoryValue: "tax-category",
      },
    ];

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
  for (let i = 1; i < Specs.length; i++) {
    let variantSku = `SNW-${skuGen(titleDetails)}-${i + 1}`;
    let variantCard = createProductCardTemplate(variantSku, Specs[i]);
    ProductVariants.push(variantCard);
  }
  console.log("ProductVariants", ProductVariants);
  return ProductVariants;
}
module.exports = { createProductCard };
