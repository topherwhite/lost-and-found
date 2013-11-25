exports.defineModel = function(sequelize, DataTypes) {
  return sequelize.define(
    "Claim", {
		type: { type: DataTypes.ENUM, allowNull: false, unique: false, validate: {}, values: ['lost', 'found']},
		location: { type: DataTypes.STRING, allowNull: true, unique: false, validate: {}},
		time: { type: DataTypes.DATE, allowNull: true, unique: false, validate: {}},
		resolved: { type: DataTypes.BOOLEAN, defaultValue: false}
    },
    {
      // column naming customization
      instanceMethods: {
        // customized instance methods
      }
    });
};