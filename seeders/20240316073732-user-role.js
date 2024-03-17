/** @format */

"use strict";

const { userRoles } = require("../utils/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("User_Roles", userRoles);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User_Roles", null);
  },
};
