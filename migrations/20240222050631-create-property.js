/** @format */

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Properties", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      listingType: {
        type: Sequelize.ENUM(["SALE", "RENTAL"]),
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      propertyTypeId: {
        type: Sequelize.UUID,
        references: {
          model: "PropertyTypes",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM(["PENDING", "CANCEL", "APPROVE"]),
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      postedBy: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      thumb: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bathRoom: {
        type: Sequelize.INTEGER,
      },
      bedRoom: {
        type: Sequelize.INTEGER,
      },
      propertySize: {
        type: Sequelize.FLOAT,
      },
      yearBuilt: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Properties");
  },
};
