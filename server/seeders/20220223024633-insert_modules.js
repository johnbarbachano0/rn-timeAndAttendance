"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert("Modules", [
        {
          title: "Logs",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Change Requests",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Admin",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "History",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Logout",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Reports",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);
  },

  down: (queryInterface, sequelize) => {
    return Promise.all([queryInterface.bulkDelete("Modules", null, {})]);
  },
};
