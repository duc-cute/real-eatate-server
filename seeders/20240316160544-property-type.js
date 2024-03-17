/** @format */

"use strict";

const { propertyTypes } = require("../utils/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("PropertyTypes", propertyTypes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PropertyTypes", null);
  },
};
