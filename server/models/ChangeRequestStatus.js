module.exports = (sequelize, DataTypes) => {
  const ChangeRequestStatus = sequelize.define("ChangeRequestStatus", {
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

  ChangeRequestStatus.associate = (models) => {
    ChangeRequestStatus.hasMany(models.ChangeRequests);
  };

  return ChangeRequestStatus;
};
