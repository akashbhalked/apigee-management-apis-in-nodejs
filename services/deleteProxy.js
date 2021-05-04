var main = require('./main.js');
exports.deleteProxy = function(req,res){
    var proxyname = req.params.proxyname;
    var url = "/v1/o/ee-nonprod/apis/"+proxyname;
    var options = {
        host: "api.enterprise.apigee.com",
        path: url,
        port: 443,
        method: "DELETE",
        headers: {
            "Authorization": req.headers.authorization
        }
    };
    console.log("options ",options);
    main.httpReq(options,(error,response)=>{
        if(error){
            res.send(error);
        }
         res.send(response);
      });
};
