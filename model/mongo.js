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
  },
  images: [type: String]
});
var Claim = mongoose.model('Claim', ClaimSchema);

module.exports = {
  Claim: Claim,
  Person: Person
}
