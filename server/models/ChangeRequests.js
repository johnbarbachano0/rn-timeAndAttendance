module.exports = (sequelize, DataTypes) => {
  const ChangeRequests = sequelize.define("ChangeRequests", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
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

  ChangeRequests.associate = (models) => {
    ChangeRequests.belongsTo(models.ChangeRequestStatus);
    ChangeRequests.belongsTo(models.TimeLogTypes);
    ChangeRequests.belongsTo(models.Users);
  };

  return ChangeRequests;
};
