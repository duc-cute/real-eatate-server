/** @format */

const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/propertyType");
const validateDTO = require("../middlewares/validation");
const { isAdmin, verifyToken } = require("../middlewares/verifyToken");
const { stringReq, string } = require("../middlewares/joiSchema");
const rateLimit = require("../middlewares/rateLimit");
router.use(rateLimit);
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
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  validateDTO(
    Joi.object({
      name: string,
      description: string,
      image: string,
    })
  ),
  ctrls.updatePropertyType
);
router.delete("/:id", verifyToken, isAdmin, ctrls.removePropertyType);
module.exports = router;
