var main = require('./main');
exports.undeployProxy = function(req,res){
    var proxyname = req.params.proxyname;
    var env = req.query.env;
    var rev = req.query.rev;
    var url = "/v1/o/ee-nonprod/e/"+env+"/apis/"+proxyname+"/revisions/"+rev+"/deployments";
    var options = {
        host: "api.enterprise.apigee.com",
        path: url,
        port: 443,
        method: "DELETE",
        headers: {
            "Authorization": req.headers.authorization
        }
    };
    main.httpReq(options,(error,response)=>{
        if(error){
            res.send(error);
        }
         var apiResponse ={};
         apiResponse.proxyName = response.aPIProxy;
         apiResponse.env = response.environment;
         apiResponse.rev = response.revision;
         apiResponse.state = response.state;
         res.send(apiResponse);
      });
};
