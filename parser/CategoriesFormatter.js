function getCategories(allCategories) {
  const catnamesArray = allCategories.map((category) =>
    category.catnames.split(";")
  );
  const uniqueCatnames = new Set(catnamesArray.flat());
  const uniqueCatnamesArray = Array.from(uniqueCatnames);
  function capitalizeFirstLetterAge(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function splitStringByComma(str) {
    const parts = str.split(",");
    if (parts[1] === "") {
      return [parts[0], ""];
    } else {
      return [parts[1], parts[0]];
    }
  }
  let CategoryCards = [];
  uniqueCatnames.forEach((category, index) => {
    let subCat = splitStringByComma(category)[0].replace(
      /[^a-zA-Z0-9\s-]/g,
      ""
    );
    let mainCat = splitStringByComma(category)[1].replace(
      /[^a-zA-Z0-9\s-]/g,
      ""
    );
    let mainCatKey = "";
    let mainCatId = "";
    if (mainCat) {
      mainCatKey = mainCat + "Key";
      mainCatId = "category";
    }
    let categoryCard = [
      { dataObject: "data-object", variant: "category" },
      { key: "key", categoryKey: `${subCat}Key` },
      { name: "description.en-US", productName: `${subCat}Description` },
      { id: "externalId", categoryId: `${subCat}Id` },
      { name: "name.en-US", productName: capitalizeFirstLetterAge(subCat) },
      { slugEn: "slug.en-US", slugEnName: `${subCat}Slug` },
      { parentKey: "parent.key", parKey: mainCatKey },
      { parentId: "parent.typeId", parId: mainCatId },
    ];
    let dataArray = categoryCard.map((obj) => Object.values(obj));
    CategoryCards.push(dataArray);
  });
  // console.log("Formatted", typeof CategoryCards, CategoryCards);
  return CategoryCards;
}
module.exports = { getCategories };
