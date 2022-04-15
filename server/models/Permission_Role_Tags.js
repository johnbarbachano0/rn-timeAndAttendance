module.exports = (sequelize, DataTypes) => {
  const Permission_Role_Tags = sequelize.define("Permission_Role_Tags", {
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

  Permission_Role_Tags.associate = (models) => {
    Permission_Role_Tags.belongsTo(models.Permissions);
    Permission_Role_Tags.belongsTo(models.Roles);
  };

  return Permission_Role_Tags;
};
