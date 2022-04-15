"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "TimeLogs", // table name
        "location", // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        "TimeLogs", // table name
        "coordinates", // new field name
        {
          type: Sequelize.JSON,
          allowNull: false,
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("TimeLogs", "coordinates"),
      queryInterface.removeColumn("TimeLogs", "location"),
    ]);
  },
};
