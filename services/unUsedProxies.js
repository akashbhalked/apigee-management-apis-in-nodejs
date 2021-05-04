var utils = require('./utility/report.js')
var main = require("./main.js");
exports.unUsedProxies = function(req,res){
    //dev environment
    var fromDate = req.query.fromDate;
    var toDate = req.query.toDate;
    var env = req.query.env;
    var proxies = [];
    var url = "/v1/o/ee-nonprod/e/"+env+"/stats/apis?select=sum(message_count)&timeUnit=month&"+"timeRange="+fromDate+"%2000:00~"+toDate+"%2023:59";
    var options = {
        host: "api.enterprise.apigee.com",
        path: url,
        port: 443,
        method: "GET",
        headers: {
            "Authorization": req.headers.authorization
        }
    };

    main.httpReq(options,(error,response)=>{
        if(error){
            res.send(error);
        }
         var apiResponse ={};
         var proxies = copyProxiesToArry(response.environments[0].dimensions);
         apiResponse.env = env;
         apiResponse.count = proxies.length;
         apiResponse.proxies = proxies;
         utils.generateCsv(apiResponse.proxies,apiResponse.env);
        res.send(apiResponse)
      });
};

function copyProxiesToArry(dimensions){
    var proxies = [];
    dimensions.forEach((dimension)=>{
        proxies.push(dimension.name)
    })
        return proxies;
}