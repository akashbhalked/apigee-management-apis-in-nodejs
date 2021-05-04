var main = require('./main.js');
exports.updateProductDetail = function(req,res){
    var productname = req.params.productname;
    var payload = JSON.stringify(req.body);
    var url = "/v1/o/ee-nonprod/apiproducts/"+productname;
    var options = {
        host: "api.enterprise.apigee.com",
        path: url,
        port: 443,
        method: "PUT",
        payload: payload,
        headers: {
            "Authorization": req.headers.authorization,
            "Content-Type": "application/json"
        }
    };
    main.httpReq(options,(error,response)=>{
        if(error){
            res.send(error);
        }
        var apiResponse ={};
        apiResponse.displayName = response.displayName;
        apiResponse.approvalType = response.approvalType;
        apiResponse.proxies = response.proxies;
        res.send(apiResponse);
      });
};
