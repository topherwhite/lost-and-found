exports.getAssoc = function() {

  var Assoc = { 
    hasOne: [
		{ parent: "Claim", child: "Item", as: "Item" }
    ], 
    hasMany: [
		{ parent: "Person", child: "Claim", as: "Claim" }
    ]
  };

  return Assoc;
};