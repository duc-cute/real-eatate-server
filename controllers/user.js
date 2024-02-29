/** @format */

const asyncHandler = require("express-async-handler");
const db = require("../models");
const getCurrent = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const response = await db.User.findByPk(uid, {
    attributes: { exclude: ["password", "refreshToken"] },
    include: [
      {
        model: db.User_Role,
        as: "userRoles",
        attributes: ["roleCode"],
        nest: false,
        include: [
          {
            nest: false,
            model: db.Role,
            attributes: ["value"],
            as: "valueCode",
          },
        ],
      },
    ],
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Got" : "Cannot current",
    currentUser: response,
  });
});

const getRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.findAll({
    attributes: ["value", "code"],
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Got" : "Cannot current",
    roleUser: response,
  });
});

module.exports = {
  getCurrent,
  getRoles,
};
