
var https = require('https');
var main = require("./main.js");
var utils = require("./utility/report");
var error = require('./utility/error')
exports.getAllProxies = function(req,res){
    try{
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        var options = {
        host: "api.enterprise.apigee.com",
        path: "/v1/organizations/ee-nonprod/apis",
        port: 443,
        method: "GET",
        headers: {
            "Authorization": req.headers.authorization
        }
    };

    main.httpReq(options,(err,response)=>{
        try{
        if(err){
            res.send(error);
        }
         var apiResponse ={};
         apiResponse.count = response.length;
         var path = utils.generateCsv(response,"all-api's");
         apiResponse.filePath = req.protocol + '://' + req.get('host')+"/files/"+path;
         apiResponse.proxies = response;
         console.log("res.headerSent ",res.headerSent);
         if(!res.headerSent){
            res.send(apiResponse);
         }
        }catch(e){
            error.error(req,res);
        }
      });
    }catch(e){
        error.error(req,res);
    }
}