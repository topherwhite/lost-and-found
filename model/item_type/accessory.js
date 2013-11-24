exports.defineModel = function(sequelize, DataTypes) {
  return sequelize.define(
    "Accessory", {
		brand: { type: DataTypes.STRING, allowNull: false, unique: false, validate: {}}
	},
	{
      // column naming customization
      instanceMethods: {
      // customized instance methods
      }
    }
 );
};