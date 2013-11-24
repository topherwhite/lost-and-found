exports.defineModel = function(sequelize, DataTypes) {
  return sequelize.define(
    "Item", {
		type: { type: DataTypes.STRING, allowNull: false, unique: false, validate: {}},
		title: { type: DataTypes.STRING, allowNull: false, unique: false, validate: {}},
		imagelink: { type: DataTypes.STRING, allowNull: false, unique: false, validate: {}},
		description: { type: DataTypes.TEXT, validate: {}}
    },
	{
      // column naming customization
      instanceMethods: {
      // customized instance methods
      }
    }
 );
};