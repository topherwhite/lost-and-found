var mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate');

// Person Schema+Model
var PersonSchema = new mongoose.Schema({
	name: String,
	email: String,
	phone: String
});
PersonSchema.plugin(findOrCreate);
var Person = mongoose.model('Person', PersonSchema);

// Claim Schema+Model
var ClaimSchema = new mongoose.Schema({
  claimType: String, // claim type Lost or Found
  location: String, //geo 
  time: { type: Date, default: Date.now }, //
  resolved: { type: Boolean, default: false},
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
  item: {
  	itemType: String,
  	name: String,
  	description: String,
  	serialNumber: String
  }
});
var Claim = mongoose.model('Claim', ClaimSchema);

module.exports = {
  Claim: Claim,
  Person: Person
}


// var c1 = new Claim({ 
// 				type: 'Lost', 
// 				location: 'Heathrow Terminal 2', 
// 				time: new Date('20/11/2013'),
// 				item: {name: 'Glasses', description: "Lost a pair of glasses,..", long_description: "losafdalsjfdal;skfjdlsakjflaskdjf"},
// 				author: p1._id
// 				});
// c1.save(function(err, data) {
// 	// console.log(err);
// 	// console.log(data);
// });

// Claim.find().populate('author').exec(function(err, claims) {
// 	// console.log(claims);
// 	claims.forEach(function(claim) {

// 		console.log(claim.item.name + ' logged by ' + claim.author.name);
// 	})

// });
// var claim1 = new Claim({ 
// 						type: 'Lost', 
// 						location: 'Heathrow Terminal 2', 
// 						time: new Date('20/11/2013'),
// 						items: {type: 'Glasses'}
// 						});
// console.log(claim1);
// claim1.save(function (err, claim1) {
// 	console.log(err);
// });

// console.log(claim1);
// console.log(claim1.items.type);

// Claim.find(function(err, claims) {
// 	claims.forEach(function(claim) {
// 		//console.log(JSON.stringify(claim.items[0]));
// 	});
// 	if (err)
// 		console.log(err);
// });

// Claim.remove(function (err, product) {
//   if (err) console.log(err);
// })