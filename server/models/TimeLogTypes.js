module.exports = (sequelize, DataTypes) => {
  const TimeLogTypes = sequelize.define("TimeLogTypes", {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  TimeLogTypes.associate = (models) => {
    TimeLogTypes.hasMany(models.TimeLogs);
    TimeLogTypes.hasMany(models.ChangeRequests);
  };

  return TimeLogTypes;
};
