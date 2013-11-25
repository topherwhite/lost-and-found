exports.createModel = function(sequelize, DataTypes, modelNames) {
  
  var Model = {};
  var Assoc = require(__dirname+"/_assoc.js").getAssoc();
  var fs = require("fs");

  for (var i = 0; i < modelNames.length; i++) {
    var filePath = __dirname+"/"+modelNames[i]+".js";
    if (!fs.existsSync(filePath)) { filePath = __dirname+"/item_type/"+modelNames[i]+".js"; }
    Model[modelNames[i].charAt(0).toUpperCase()+modelNames[i].slice(1)] =
      require(filePath).defineModel(sequelize, DataTypes);
  }
  
  for (var i in Assoc.hasMany) {
    Model[Assoc.hasMany[i].parent].hasMany(Model[Assoc.hasMany[i].child],{as:Assoc.hasMany[i].as});
  }
  for (var i in Assoc.hasOne) {
		console.log("Model["+Assoc.hasOne[i].parent+"].hasOne("+Model[Assoc.hasOne[i].child]+",{as:Assoc.hasOne[i].as});");
    Model[Assoc.hasOne[i].parent].hasOne(Model[Assoc.hasOne[i].child],{as:Assoc.hasOne[i].as});
  }

	Model["Item"].belongsTo(Model["Claim"]);

  var syncChain = new DataTypes.Utils.QueryChainer();
  for (var i in Model) { syncChain.add(Model[i].sync()); }
  syncChain.run()
    .success(function(){ console.log("Model sync success"); })
    .error(function(err){ console.log("Model sync failure -> "+err); });

  return Model;
};