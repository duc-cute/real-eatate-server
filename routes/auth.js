/** @format */

const Joi = require("joi");
const ctrls = require("../controllers/auth");
const validateDTO = require("../middlewares/validation");
const router = require("express").Router();
const { stringReq, numberReq, string } = require("../middlewares/joiSchema");

router.post(
  "/register",
  validateDTO(
    Joi.object({
      password: stringReq,
      name: stringReq,
      phone: numberReq,
      roleCode: string,
    })
  ),
  ctrls.register
);

router.post(
  "/signin",
  validateDTO(
    Joi.object({
      password: stringReq,
      phone: numberReq,
    })
  ),
  ctrls.signIn
);

router.post("/refresh-accesstoken", ctrls.refreshAccessToken);
module.exports = router;
