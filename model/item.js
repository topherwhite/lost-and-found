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
		}
    },
	{
      // column naming customization
      instanceMethods: {
      // customized instance methods
      }
    }
 );
};
