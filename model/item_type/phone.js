exports.defineModel = function(sequelize, DataTypes) {
  return sequelize.define(
    "Phone", {
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