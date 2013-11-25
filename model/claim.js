exports.defineModel = function(sequelize, DataTypes) {
  return sequelize.define(
    "Claim", {
		type: { type: DataTypes.ENUM, allowNull: false, unique: false, validate: {}, values: ['lost', 'found'], promptUserInput:false},
		location: { type: DataTypes.STRING, allowNull: true, unique: false, validate: {}, promptUserInputMsg: "Where did you last see the item(s)?"},
		time: { type: DataTypes.DATE, allowNull: true, unique: false, validate: {}, promptUserInputMsg: "When did you last see the item(s)?"},
		resolved: { type: DataTypes.BOOLEAN, defaultValue: false, promptUserInput:false}
    },
    {
      // column naming customization
      instanceMethods: {
        // customized instance methods
      }
    });
};