const importExportData = "-----Hello import Export Data------------";

// module export
// module.exports = importExportData;

const two = () =>  {
      return "Hello Data"
}
// module name export
// module.exports.importExportData = importExportData;
// module.exports.two = two;

module.exports = {
      importExportData,
      two
};


module.exports.three = function three(){
      return "Hello Data"
}


// package.json e type module
// export const four = () => {
//       return "Hello Data"
// }