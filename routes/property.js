/** @format */

const router = require("express").Router();

const ctrls = require("../controllers/property");

router.get("/", ctrls.getProperties);

module.exports = router;
