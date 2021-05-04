var base64 = require("base-64");

var https = require('https');
var fs = require('fs');
exports.base64Value = function(userName , password){
    return "Basic "+base64.encode(userName+":"+password);
}

exports.httpReq = function(options,filename,callback){
    console.log("options ",options);
    var payload = "";
    if(options.payload) payload = JSON.stringify(options.payload);
    var req = https.request(options,function(resp){
        console.log("resp::",resp.headers["content-disposition"],filename);
        if(resp.statusCode == 401 || resp.statusCode == 500){
            var response = {
                "code" : "Unauthorized",
                "message " :"Provide valid credentials"
            }
            return callback(response,null);
        }
        else{
            
            //var regexp = /filename=\"(.*)\"/gi;
            //console.log("regexp ",regexp.exec( resp.headers['content-disposition']))
           // var filename1 = regexp.exec( resp.headers['content-disposition'] )[1];

            // create file write stream
            var fws = fs.createWriteStream("public/bundle/"+filename+".zip");

            // setup piping
            resp.pipe(fws);
            fws.on('finish', function () { 
                console.log("piping is done");
                let data ="file downloaded";              
                return callback(null,data);
             });
            // resp.on('end',function(){
            //     var response ={};  
                
            // });
            resp.on("error",(error)=>{
                return callback(error,null);
            });
        }
    
    }).on('error',(error)=>{
        console.log('error occured',error);
        return callback(error,null);
    });
    console.log("payload ",payload);
    req.write(payload);
    req.end();
}

