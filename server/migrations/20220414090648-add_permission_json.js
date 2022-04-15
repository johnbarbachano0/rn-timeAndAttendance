"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "Permission_Role_Tags", // table name
        "permission", // new field name
        {
          type: Sequelize.JSON,
          allowNull: true,
        }
      ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Permission_Role_Tags", "permission"),
    ]);
  },
};
