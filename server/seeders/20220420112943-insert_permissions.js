"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkInsert("Permissions", [
        {
          title: "View Logs Module",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "View Change Requests Module",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "View Admin Module",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "View History Module",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "View Logout Module",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Allow Time In/Out",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Add Change Request",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Update Change Request",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Approve Change Request",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Add Maintenance",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Edit Maintenance",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "View Reports",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "View Duration Report",
          status: true,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.bulkDelete("Modules", null, {})]);
  },
};
