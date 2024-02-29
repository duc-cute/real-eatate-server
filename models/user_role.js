/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Role.belongsTo(models.Role, {
        foreignKey: "roleCode",
        as: "valueCode",
        targetKey: "code",
      });
    }
  }
  User_Role.init(
    {
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      roleCode: {
        type: DataTypes.STRING,
        references: {
          model: "Roles",
          key: "code",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User_Role",
    }
  );
  return User_Role;
};
