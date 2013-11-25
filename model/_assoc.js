exports.getAssoc = function() {

  var Assoc = { 
    hasOne: [
		//items categories
		{ parent: "Item", child: "Accessory", as: "Accessory" },
		{ parent: "Item", child: "Bag", as: "Bag" },
		{ parent: "Item", child: "Clothing", as: "Clothing" },
		{ parent: "Item", child: "Key", as: "Key" },
		{ parent: "Item", child: "Phone", as: "Phone" },
		{ parent: "Item", child: "Tablet", as: "Tablet" }
    ], 
    hasMany: [
		{ parent: "Person", child: "Claim", as: "Claim" },
		{ parent: "Claim", child: "Item", as: "Item" }
    ]
  };

  return Assoc;
};