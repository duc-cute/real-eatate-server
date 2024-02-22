/** @format */

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { throwErrorWithStatus } = require("./errHandler");
const verifyToken = asyncHandler(async (req, res, next) => {
  const isToken = req?.headers?.authorization?.startsWith("Bearer");
  if (!isToken)
    return throwErrorWithStatus(401, "Creds not provide!", res, next);

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) return throwErrorWithStatus(401, "Creds invalid!", res, next);
    req.user = decode;
    next();
  });
});

module.exports = { verifyToken };
