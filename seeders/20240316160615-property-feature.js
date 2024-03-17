/** @format */

"use strict";

const { propertyFeature } = require("../utils/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("PropertyFeatures", propertyFeature);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PropertyFeatures", null);
  },
};
