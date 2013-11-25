exports.defineModel = function(sequelize, DataTypes) {
  return sequelize.define(
    "Item", {
		type: { 
			type: DataTypes.ENUM, allowNull: false, unique: false, validate: {}, 
			values: [
				"glasses", 
				"bag",
				"keys",
				"phone",
				"tablet",
				"wallet",
				"clothing",
				"other"
				]	
		},
			short_description: {type:DataTypes.STRING, allowNull: false, unique: false, validate: {}},
			long_description: {type:DataTypes.TEXT, allowNull: false, unique: false, validate: {}}
    },
	{
      // column naming customization
      instanceMethods: {
      // customized instance methods
      }
    }
 );
};
