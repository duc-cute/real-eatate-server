/** @format */

const router = require("express").Router();
const ctrls = require("../controllers/insert");

router.post("/init-role", ctrls.initRoles);

module.exports = router;
