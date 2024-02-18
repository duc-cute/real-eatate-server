/** @format */

const asyncHandler = require("express-async-handler");
const register = asyncHandler(async (req, res) => {
  const { name, phone, password, role } = req.body;
  return res.json({
    success: true,
    mes: "API OKE 1",
    data: { name, phone, password, role },
  });
});

module.exports = {
  register,
};
