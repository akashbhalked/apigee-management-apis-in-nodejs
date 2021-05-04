var main = require('./main.js');
var error = require('./utility/error.js')
exports.productDetail = function(req,res){
    try{
    var productname = req.query.productname;
    console.log("productname ",productname)
    var url = "/v1/o/ee-nonprod/apiproducts/"+productname;
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
            res.send(err);
        }
        var apiResponse ={};
        apiResponse.displayName = response.displayName;
        apiResponse.approvalType = response.approvalType;
        apiResponse.proxies = response.proxies;
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
