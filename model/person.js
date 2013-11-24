exports.defineModel = function(sequelize, DataTypes) {
  return sequelize.define(
    "Person", {
		email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: {isEmail: true}},
		phone: { type: DataTypes.STRING, allowNull: true, unique: true, validate: {}},
		manager: {type: DataTypes.BOOLEAN, defaultValue: false}
    },
    {
      // column naming customization
      instanceMethods: {
        // customized instance methods
      }
    });
};