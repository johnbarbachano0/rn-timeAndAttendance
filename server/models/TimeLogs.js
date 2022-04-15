module.exports = (sequelize, DataTypes) => {
  const TimeLogs = sequelize.define("TimeLogs", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    isUploaded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  TimeLogs.associate = (models) => {
    TimeLogs.belongsTo(models.TimeLogTypes);
    TimeLogs.belongsTo(models.Users);
  };

  return TimeLogs;
};
