module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: { min: 6 },
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: { isEmail: true },
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date("1990-01-01T00:00:00.000Z"),
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        "$2b$10$Rky6GFQ/NdezRimGu4JTSehZ.7Fw6mhBEcpzDtod1oBwP/WajNYaW",
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    approverId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Users.associate = (models) => {
    Users.belongsTo(models.Roles);
    Users.hasMany(models.TimeLogs);
    Users.hasMany(models.ChangeRequests);
  };
  return Users;
};
