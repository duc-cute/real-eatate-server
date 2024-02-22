/** @format */

const asyncHandler = require("express-async-handler");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwErrorWithStatus } = require("../middlewares/errHandler");
const register = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  const response = await db.User.findOrCreate({
    where: { phone },
    defaults: req.body,
  });

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

  const token = jwt.sign(
    { uid: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return res.json({
    success: true,
    mes: "Sign in is successfully",
    accessToken: token,
  });
});

module.exports = {
  register,
  signIn,
};
