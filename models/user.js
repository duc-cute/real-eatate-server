/** @format */

"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.User_Role, { foreignKey: "userId", as: "userRoles" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          const salt = bcrypt.genSaltSync(10);
          this.setDataValue("password", bcrypt.hashSync(value, salt));
        },
      },
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      avatar: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
