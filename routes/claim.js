
var Model = global.Model;

exports.list = function(req, res){
	Model.Claim.findAll().success(function(claims) {
		//console.log(claims.rows);
		console.log(claims);
		res.render('claim', {claims:claims});
		claims.forEach(function(claim) {
				console.log(claim.id + ' ' + claim.type + ' ' + claim.time);
		});
	});
};

exports.create = function(req, res) {
  res.send("respond with a resource");
};
