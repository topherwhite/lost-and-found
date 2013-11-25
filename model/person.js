exports.defineModel = function(sequelize, DataTypes) {
  return sequelize.define(
    "Person", {
		email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: {isEmail: true}, promptUserInputMsg: "Please provide a contact email address."},
		phone: { type: DataTypes.STRING, allowNull: true, unique: true, validate: {}, promptUserInputMsg: "Please provide a contact phone number."},
		manager: {type: DataTypes.BOOLEAN, defaultValue: false, promptUserInput:false }
    },
    {
      // column naming customization
      instanceMethods: {
        // customized instance methods
      }
    });
};