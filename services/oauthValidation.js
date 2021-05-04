var main = require("./main.js");
exports.oauthValidation = function (req, res, next) {
    try{
    if (!req.headers.username || !req.headers.password) {
        var response = {
            "code": "Unauthorized",
            "message ": "Missing credentials"
        }
        res.set('Content-Type', 'application/json');
        res.status(401);
        res.send(response);
    } else {
        req.headers.authorization = main.base64Value(req.headers.username, req.headers.password);
        next();
    }
}catch(e){
    res.send("OOps!!!Something went wrong..Try again..");
}
}



