var main = require('./main.js');
var error = require('./utility/error');
var readCsv = require('./utility/readcsv.js');
var fs = require('fs');
var downloadBundle = require('./downloadBundle.js');
exports.allApiDeploymentDetails = function (req, res) {
    try {
        var proxieDetails = [];
        readCsv.readcsv(function (proxyArray) {
            console.log("data", proxyArray);
            var count = 0;
            proxyArray.forEach(e => {
                var url = "/v1/o/ee-nonprod/apis/" + e + "/deployments";
                var options = {
                    host: "api.enterprise.apigee.com",
                    path: url,
                    port: 443,
                    method: "GET",
                    headers: {
                        "Authorization": req.headers.authorization
                    }
                };
                main.httpReq(options, (err, response) => {
                    try {
                        if (err) {
                            res.send(error);
                        }
                        count++;
                        var apiResponse = {};
                        console.log("response ",response);
                        apiResponse.proxyname = response.name;
                        if (copyProxiesToArry(response.environment, e).length > 0) {
                            proxieDetails.push(copyProxiesToArry(response.environment, e))
                        }
                        console.log('proxyArray.length ',proxyArray.length,count);
                        if (proxyArray.length == count) {
                            fs.writeFile('deploymentDetails.json',JSON.stringify(proxieDetails), function (err) {
                                if (err) throw err;
                                console.log('Replaced!');
                              });
                            res.send(proxieDetails);
                            downloadBundle.downloadBundle(req, res, proxieDetails)
                        }
                    } catch (e) {
                        console.log("eeeeeeeee", e);
                        error.error(req, res);
                    }
                });
            })
        });

    } catch (e) {
        console.log("error", e);
        error.error(req, res);
    }
};

function copyProxiesToArry(environments, apiName) {
    var proxyDetail = [];
    environments.forEach((environment) => {

        var proxy = {};
        proxy.name = apiName;
        proxy.environment = environment.name;
        proxy.revision = environment.revision[0].name;
        proxyDetail.push(proxy);
    });
    return proxyDetail;
}