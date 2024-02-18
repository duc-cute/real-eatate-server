/** @format */

const Joi = require("joi");
const ctrls = require("../controllers/auth");
const validateDTO = require("../middlewares/validation");
const router = require("express").Router();
const { stringReq, numberReq } = require("../middlewares/joiSchema");

router.post(
  "/register",
  validateDTO(
    Joi.object({ password: stringReq, name: stringReq, phone: numberReq })
  ),
  ctrls.register
);

module.exports = router;
