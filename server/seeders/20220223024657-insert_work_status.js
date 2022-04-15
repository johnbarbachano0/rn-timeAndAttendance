"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert("WorkStatuses", [
        {
          title: "Not Timed In",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Working",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Timed Out",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);
  },

  down: (queryInterface, sequelize) => {
    return Promise.all([queryInterface.bulkDelete("WorkStatuses", null, {})]);
  },
};
