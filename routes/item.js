
/*
 * GET users listing.
 */



exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.create = function(req, res) {

  var Model = global.Model;

  res.render("index", { thing: "blah" });

};