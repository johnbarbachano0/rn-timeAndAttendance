"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint("Users", "users_ibfk_2", {}),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([]);
  },
};
