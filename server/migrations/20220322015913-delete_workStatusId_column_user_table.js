"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    Promise.all([queryInterface.removeColumn("Users", "WorkStatusId")]);
  },

  async down(queryInterface, Sequelize) {},
};
