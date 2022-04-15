"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert("ChangeRequestStatuses", [
        {
          title: "Pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Approved",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Rejected",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);
  },

  down: (queryInterface, sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete("ChangeRequestStatuses", null, {}),
    ]);
  },
};
