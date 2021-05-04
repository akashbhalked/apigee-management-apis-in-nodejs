var main = require("./downloadFileMain");
var async = require("async");
var utils = require("./utility/report")
var error = require('./utility/error')
var https = require('https');
var fs = require('fs');
exports.downloadBundle = function (req, res, proxieDetails) {
    try {
        var proxyCount = 0;
        var proxyPipedCount = 0;
        var auth = req.headers.authorization;
        proxieDetails.forEach(proxyDetail => {
            proxyDetail.forEach(proxy => {
                var proxyName = proxy.name;
                var rev = proxy.revision;
                var options = {
                    host: "api.enterprise.apigee.com",
                    path: "/v1/organizations/ee-nonprod/apis/" + proxyName + "/revisions/" + rev + "?format=bundle",
                    port: 443,
                    method: "GET",
                    headers: {
                        "Authorization": auth
                    },
                };
                var filename = proxyName + "_" + proxy.environment + "_" + rev;
                var payload = "";
                if (options.payload) payload = JSON.stringify(options.payload);
                var req = https.request(options, function (resp) {
                    proxyCount++;
                    console.log("resp::", resp.headers["content-disposition"], filename);
                        var fws = fs.createWriteStream("public/bundle/" + filename + ".zip");
                        // setup piping
                        resp.pipe(fws);
                         fws.on('finish',function () {
                            console.log("piping is done");
                            let data = "file downloaded";
                            proxyPipedCount++;
                            console.log("both variables ", proxyCount, proxyPipedCount);
                            if (proxyCount == proxyPipedCount) {
                                var response = "proxies downloaded successfully";
                                // if(!res.headerSent){
                                //     res.set("Content-Type", "application/json");
                                //     res.send(JSON.stringify(response));
                                // }
                                console.log('proxies downloaded successfully');
                            }
                        });
                        resp.on("error", (error) => {
                            return callback(error, null);
                        });

                }).on('error', (error) => {
                    console.log('error occured', error);
                    return callback(error, null);
                });
                req.write(payload);
                req.end();
            })
        });


    } catch (e) {
        error.error(req, res);
    }
}