/** @format */

"use strict";

const { feature } = require("../utils/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Features", feature);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Features", null);
  },
};
