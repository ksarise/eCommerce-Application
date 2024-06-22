const fs = require("fs");
const XLSX = require("xlsx");

function formatAndExportData(ProductCards, fileName) {
  function createKeyValueArrays(arrays) {
    let keysObj = {};

    arrays.forEach((array) => {
      array.forEach((pair) => {
        keysObj[pair[0]] = "";
      });
    });

    let keys = Object.keys(keysObj);

    let result = [];
    result.push(keys);

    arrays.forEach((array) => {
      let valuesArray = [];
      keys.forEach((key) => {
        let value = array.find((pair) => pair[0] === key);
        valuesArray.push(value ? value[1] : "");
      });
      result.push(valuesArray);
    });

    return result;
  }
  // CSV export
  let wc = XLSX.utils.aoa_to_sheet(createKeyValueArrays(ProductCards));
  let csvContent = XLSX.utils.sheet_to_csv(wc);
  let filePathCsv = `${fileName}.csv`;
  fs.writeFileSync(filePathCsv, csvContent);

  // Excel export
  let wb = XLSX.utils.book_new();
  let we = XLSX.utils.aoa_to_sheet(createKeyValueArrays(ProductCards));
  XLSX.utils.book_append_sheet(wb, we, fileName);
  let filePathExcel = `${fileName}.xlsx`;
  XLSX.writeFile(wb, filePathExcel);
  console.log(`data${fileName} exported`);
}
module.exports = { formatAndExportData };
