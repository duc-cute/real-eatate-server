/** @format */

const jwt = require("jsonwebtoken");
// const generateAccessToken = (uid, roleCode) => {
//   return jwt.sign({ uid, roleCode }, process.env.JWT_SECRET, {
//     expiresIn: process.env.ACCESS_EXPIRE,
//   });
// };
const generateAccessToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_EXPIRE,
  });
};
const generateRefreshToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRE,
  });
};
module.exports = { generateAccessToken, generateRefreshToken };
