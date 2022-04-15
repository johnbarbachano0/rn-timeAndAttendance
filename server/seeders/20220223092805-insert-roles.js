"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert("Roles", [
        {
          title: "Admin",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "User",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);
  },

  down: (queryInterface, sequelize) => {
    return Promise.all([queryInterface.bulkDelete("Roles", null, {})]);
  },
};
