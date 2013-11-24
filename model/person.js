exports.defineModel = function(sequelize, DataTypes) {
  return sequelize.define(
    "Person", {
		email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: {}},
		phone: { type: DataTypes.STRING, allowNull: true, unique: true, validate: {}}		
    },
    {
      // column naming customization
      instanceMethods: {
        // customized instance methods
      }
    });
};