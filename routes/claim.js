
var Model = global.Model;

exports.list = function(req, res){
	Model.Claim.findAll().success(function(claims) {
		res.render('claim', { claims: claims });
	});
};

exports.create = function(req, res) {
  res.send("respond with a resource");
};

exports.resolve = function(req, res) {
		
}