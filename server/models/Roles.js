module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define("Roles", {
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

  Roles.associate = (models) => {
    Roles.hasMany(models.Users);
    Roles.hasMany(models.Permission_Role_Tags);
  };

  return Roles;
};
