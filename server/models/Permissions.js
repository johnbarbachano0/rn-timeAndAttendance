module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define("Permissions", {
    title: {
      type: DataTypes.STRING(100),
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

  Permissions.associate = (models) => {
    Permissions.hasMany(models.Permission_Role_Tags);
  };

  return Permissions;
};
