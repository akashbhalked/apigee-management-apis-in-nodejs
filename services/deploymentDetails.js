var main = require('./main.js');
var error = require('./utility/error')
exports.deploymentDetails = function(req,res){
    try{
    var proxyname = req.query.proxyname;
    console.log("proxyname ",proxyname);
    var url = "/v1/o/ee-nonprod/apis/"+proxyname+"/deployments";
    var options = {
        host: "api.enterprise.apigee.com",
        path: url,
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
         console.log(" response ",JSON.stringify(response));
         apiResponse.proxyname = response.name;
         console.log("response.environment ",response.environment);
         apiResponse.deploymentDetails = copyProxiesToArry(response.environment);
         if(!res.headersSent){
            res.send(apiResponse);
         }
        }catch(e){
            error.error(req,res);
        }
      });
    }catch(e){
        error.error(req,res);
    }
};

function copyProxiesToArry(environments){
    var proxieDetails = [];
   
    environments.forEach((environment)=>{
        var proxy = {};
        proxy.name = environment.name;
        proxy.revision = environment.revision[0].name;
        proxieDetails.push(proxy);
    })
        return proxieDetails;
}
