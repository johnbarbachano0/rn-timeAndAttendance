module.exports = (sequelize, DataTypes) => {
  const WorkStatus = sequelize.define("WorkStatus", {
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

  return WorkStatus;
};
