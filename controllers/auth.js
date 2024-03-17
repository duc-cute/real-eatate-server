/** @format */

const asyncHandler = require("express-async-handler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const { throwErrorWithStatus } = require("../middlewares/errHandler");
const register = asyncHandler(async (req, res) => {
  const { phone, name, password } = req.body;

  const response = await db.User.findOrCreate({
    where: { phone },
    defaults: {
      phone,
      name,
      password,
    },
  });

  const userId = response[0]?.id;
  if (userId) {
    const roleCode = ["ROL7"];
    if (req?.body?.roleCode) roleCode.push(req.body?.roleCode);
    const roleCodeBulk = roleCode.map((role) => ({ userId, roleCode: role }));
    await db.User_Role.bulkCreate(roleCodeBulk);
  }

  return res.json({
    success: response[1],
    mes: response[1]
      ? "Yout account is created"
      : "PhoneNumber is already had exist",
  });
});

const signIn = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  const user = await db.User.findOne({ where: { phone } });

  if (!user)
    return throwErrorWithStatus(401, "Phone or Password incorrect!", res, next);

  const isMatchingPassword = bcrypt.compareSync(password, user.password);

  if (!isMatchingPassword)
    return throwErrorWithStatus(401, "Phone or Password incorrect!", res, next);
  const roles = await db.User_Role.findAll({
    where: {
      userId: user.dataValues.id,
    },
    attributes: ["roleCode"],
  });

  const accessToken = generateAccessToken(user.id, roles);
  const newRefreshToken = generateRefreshToken(user.id);
  await db.User.update(
    { refreshToken: newRefreshToken },
    {
      where: { phone },
    }
  );

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    success: true,
    mes: "Sign in is successfully",
    accessToken: accessToken,
  });
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie || !cookie.refreshToken)
    return throwErrorWithStatus(403, "No Fresh token in cookie", res, next);
  const rs = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await db.User.findOne({
    where: { id: rs.uid, refreshToken: cookie.refreshToken },
  });

  return res.json({
    success: response ? true : false,
    mes: "hihi in is successfully",
    newAccessToken: response
      ? generateAccessToken(response?.id)
      : "Refresh not match",
  });
});

module.exports = {
  register,
  signIn,
  refreshAccessToken,
};
