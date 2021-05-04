var base64 = require("base-64");

var https = require('https');
exports.base64Value = function(userName , password){
    return "Basic "+base64.encode(userName+":"+password);
}

exports.httpReq = function(options,callback){
    var payload = "";
    if(options.payload) payload = JSON.stringify(options.payload);
    var req = https.request(options,function(resp){
        if(resp.statusCode == 401 || resp.statusCode == 500){
            var response = {
                "code" : "Unauthorized",
                "message " :"Provide valid credentials"
            }
            return callback(response,null);
        }
        else{
            let data ="";
            resp.on('data',function(chunk){
                data += chunk;
            });
    
            resp.on('end',function(){
                //resp.set('Content-Type', 'application/json');
                var response ={};
                
                data = JSON.parse(data);
                //console.log("data type ",data);
                return callback(null,data);
            });
            resp.on("error",(error)=>{
                return callback(error,null);
            });
        }
    
    }).on('error',(error)=>{
        console.log('error occured',error);
        return callback(error,null);
    });
    req.write(payload);
    req.end();
}