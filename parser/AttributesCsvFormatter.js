function attribCsvFormat(str) {
  const index = str.indexOf("(");
  let newStr = index !== -1 ? str.slice(0, index) : str;
  return `attributes.${newStr.replace(/\s/g, "")}`;
}
module.exports = { attribCsvFormat };
