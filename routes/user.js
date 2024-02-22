/** @format */

const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyToken } = require("../middlewares/verifyToken");
router.get("/current", verifyToken, ctrls.getCurrent);

module.exports = router;
