"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert("TimeLogTypes", [
        {
          title: "In",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Out",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);
  },

  down: (queryInterface, sequelize) => {
    return Promise.all([queryInterface.bulkDelete("TimeLogTypes", null, {})]);
  },
};
