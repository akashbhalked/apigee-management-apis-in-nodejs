const express = require('express');
var oauth = require("./services/oauthValidation.js");
var bodyParser = require("body-parser");
var cors = require('cors');

var getAllProxies = require('./services/getAllProxies.js');
var unUsedProxies = require('./services/unUsedProxies.js');
var deploymentDetails = require('./services/deploymentDetails.js');
var undeployProxy = require('./services/undeployProxy.js');
var deleteProxy = require("./services/deleteProxy.js");
var productDetail = require('./services/productDetail.js');
var updateProductDetail = require('./services/updateProductDetail.js');
var allUnUsedProxies = require('./services/allUnUsedProxies.js');
var undeployedAllEnv = require('./services/undeployedAllEnv.js');
var downloadBundle = require('./services/downloadBundle.js');
var allDeploymentDetails = require('./services/allApiDeploymentDetails');
var revisionCount = require('./services/revisionCount');
var app = express();
const PORT = process.env.PORT || 4000;
//app.use(morgan('dev'));
//body-parser as middleware configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// Serves static files
app.use("/files", express.static('public'));
//user validation
app.all("*", oauth.oauthValidation);
//returns all proxies
app.get('*/api/v1/apis', getAllProxies.getAllProxies);
//get deployment details for proxy
app.get('*/api/v1/api-deployment-detail', deploymentDetails.deploymentDetails);
//get product details
app.get("*/api/v1/api-product-detail", productDetail.productDetail);
//returns zero traffic api list
app.get("*/api/v1/zero-traffic-apis", allUnUsedProxies.allUnUsedProxies);
//returns undeployed api list
app.get("*/api/v1/undeployed-apis", undeployedAllEnv.undeployedAllEnv);
//downloads undeployed proxy bundles
app.get("*/api/v1/download-api-bundles", downloadBundle.downloadBundle);
//returns deployment details of zero traffic apis
app.get("*/api/v1/api-deployment-details", allDeploymentDetails.allApiDeploymentDetails);
//returns deployed proxy count of the zero traffic apis
app.get("*/api/v1/api-revision-count", revisionCount.revisionCount);

app.listen(PORT, function () {
    console.log('server listening on ', PORT);
});
