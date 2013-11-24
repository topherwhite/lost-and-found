exports.defineModel = function(sequelize, DataTypes) {
  return sequelize.define(
    "Location", {
		type: { type: DataTypes.ENUM, allowNull: false, unique: true, validate: {}, values: ['lost', 'found']}	
    }
    {
      // column naming customization
      instanceMethods: {
        // customized instance methods
      }
    });
};