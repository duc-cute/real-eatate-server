/** @format */

const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/propertyType");
const validateDTO = require("../middlewares/validation");
const { isAdmin, verifyToken } = require("../middlewares/verifyToken");
const { stringReq } = require("../middlewares/joiSchema");

router.post(
  "/create",
  verifyToken,
  isAdmin,
  validateDTO(
    Joi.object({
      name: stringReq,
      description: stringReq,
      image: stringReq,
    })
  ),

  ctrls.createNewPropertyType
);
router.get("/", ctrls.getPropertyType);

module.exports = router;
