var mongoose = require("mongoose");
var Mail = require("../util/mail.js");

var Claim = require("../model/mongo.js").Claim;
var Person = require("../model/mongo.js").Person;
var PersonCtl = require("../routes/person.js");


exports.list = function(req, res){
	Claim.find().populate('author').exec(function(err, claims) {
		Claim.count({ resolved: false}, function(err, count) {
			console.log(claims);
			res.render('claim_list', { claims: claims, countOpen: count});
		});
	});
};

exports.detail = function(req, res){
	Claim.findById(req.params.id).populate('author').exec(function(err, claim) {
		console.log(claim);
		res.render('claim_detail', { claim: claim });
	});
};

exports.add = function(req, res) {
  res.render('claim_add');
};

exports.status = function(req, res) {
	console.log(req.body)
	Claim.findByIdAndUpdate(req.body.claimId, {resolved:req.body.resolved}, function (err, claim) {
		console.log(claim);
		if (!err) {
			console.log("Claim updated");
			res.send(200, {result:'Claim updated'});
		} else {
			console.log(err);
			res.send(500, {result:'Something went wrong, please try again.'});
		}
	});
};

exports.delete = function(req, res) {
	console.log(req.body)
	Claim.findOneAndRemove(req.body.claimId, function (err, claim) {
		console.log(claim);
		if (!err) {
			console.log("Claim removed");
			res.send(200, {result:'Claim removed'});
		} else {
			console.log(err);
			res.send(500, {result:'Something went wrong, please try again.'});
		}
	});
};

exports.statusResolved = function(req, res) {
	console.log(req.body)
	Claim.findByIdAndUpdate(req.params.claimId, {resolved:true}, function (err, claim) {
		console.log(claim);
		if (!err) {
			console.log("Issue updated");
			res.render('claim_status', {status:'resolved'})
		} else {
			console.log(err);
			res.render('claim_status')
		}
	});
};

exports.statusUnresolved = function(req, res) {
	console.log(req.body)
	Claim.findByIdAndUpdate(req.params.claimId, {resolved:false}, function (err, claim) {
		console.log(claim);
		if (!err) {
			console.log("Issue updated");
			res.render('claim_status', {status:'resolved'})
		} else {
			console.log(err);
			res.render('claim_status')
		}
	});
};

exports.create = function(req, res) {
	// console.log(req.body);
	
	// check the person first
	var person1 = new Person({
		email: req.body.author.email, 
		name: req.body.author.name, 
		phone: req.body.author.phone
	});

	Person.create(person1, function(err, person1) {
		Person.findOrCreate({'email': req.body.author.email}, function(err, person1, created) {
			if (created) {
				console.log("Person not found " + person1.email + ", let's create it");
				console.log("Person created with id:" + person1._id);		
			} else {
				console.log("Person found with " + person1.email + ", id:" + person1._id);
			}
			// console.log(person1);

			//let's create the claim now
			console.log('Let\'s create the claim now');
			// delete req.body.author;
			var newClaim = new Claim({
			  claimType: req.body.claimType, 
			  location: req.body.location, 
			  time: req.body.time, //
			  resolved: false,
			  author: person1._id,
			  item: req.body.item
			});
			// console.log(newClaim);

			newClaim.save(function(err, claim) {
				if (!err) {
					//newClaim.author.push(person1._id);

					console.log("Claim created with id: " + claim._id);
					 //sendmail
          res.render('email_claim_new', { claim:claim}, function(err, html) {
          	Mail.sendMail("New claim", person1.email, html);
          });

					res.send(200, {result:'Claim created with id: ' + claim._id});
				} else {
					console.log(err);
					res.send(500, {result:'Something went wrong, please try again.'});
				}
			});
		}); 
	});
};
