exports.error = function(req,res){
    var error = "OOps!!!Something went wrong..Try again..";
    res.set('Content-type','application/json');
    res.send(JSON.stringify(error));
}