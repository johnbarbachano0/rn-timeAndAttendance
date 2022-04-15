"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert("Users", [
        {
          id: uuidv4(),
          username: "admin",
          firstname: "admin",
          lastname: "admin",
          email: "admin2@admin.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          RoleId: 1,
          WorkStatusId: 1,
        },
      ]),
    ]);
  },

  down: (queryInterface, sequelize) => {
    return Promise.all([queryInterface.bulkDelete("Users", null, {})]);
  },
};
