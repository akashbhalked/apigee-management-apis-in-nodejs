var fs = require('fs');
var parse = require('csv-parse');
const XLSX = require('xlsx');
exports.readcsv = function (callback) {
  var csvData = [];
  fs.createReadStream("public/not-deployed-to-any-env-list.csv")
    .pipe(parse({ delimiter: ':' }))
    .on('data', function (csvrow) {
      if (csvrow[0] != 'NAME') {
        csvData.push(csvrow[0]);
      }

    })
    .on('end', function () {
      //do something wiht csvData
      console.log("finalData ", csvData);
      return callback(csvData);
    });
}
exports.readMatserProxies = function(){
console.log('here')
  var workbook = XLSX.readFile('./public/Master_Proxies_to_not_be_deleted.xls');
  var sheet_name_list = workbook.SheetNames;
  console.log('sheet_name_list',sheet_name_list)
  var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  
  var arr = [];
  for(var i = 0; i < data.length; i++){
      arr.push(data[i]["Proxy Name"]);
   }
   
   console.log("proxy array ",arr);
   return arr;
}