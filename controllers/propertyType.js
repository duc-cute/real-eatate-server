/** @format */

const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
const { throwErrorWithStatus } = require("../middlewares/errHandler");

const createNewPropertyType = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const response = await db.PropertyType.findOrCreate({
    where: { name },
    defaults: req.body,
  });

  return res.json({
    success: response[1],
    mes: response[1] ? "Created" : "Name property type dulicated",
    propertyType: response[0],
  });
});

const getPropertyType = asyncHandler(async (req, res) => {
  const { limit, page, field, sort, name, ...query } = req.query;
  let options = {};
  if (name) query.name = { [Op.iLike]: `%${name}%` };

  if (sort) {
    let order = sort.split(",");
    order = order.map((el) =>
      el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
    );
    options.order = order;
  }
  if (field) {
    const attributes = field.split(",");
    const isExclude = attributes.some((el) => el.startsWith("-"));

    if (isExclude)
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")),
      };
    else options.attributes = attributes;
  }

  if (!limit) {
    const response = await db.PropertyType.findAll({
      where: query,
      ...options,
    });
    return res.json({
      success: response.length > 0,
      mes: response.length > 0 ? "Got" : "Cannot get property type",
      propertyType: response,
    });
  }
  const offset = (page - 1) * limit;
  if (offset) options.offset = offset;
  options.limit = +limit;
  const response = await db.PropertyType.findAndCountAll({
    where: query,
    ...options,
  });
  return res.json({
    success: response.length > 0,
    mes: response.length > 0 ? "Got" : "Cannot get property type",
    propertyType: response,
  });
});

const updatePropertyType = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0)
    return throwErrorWithStatus(403, "Missing input", res, next);
  const response = await db.PropertyType.update(req.body, {
    where: {
      id,
    },
  });
  return res.json({
    success: response[0] > 0 ? true : false,
    mes: response[0] > 0 ? "Updated" : "Name property type dulicated",
  });
});

const removePropertyType = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    return throwErrorWithStatus(403, "Missing id property type", res, next);
  const response = await db.PropertyType.destroy({
    where: { id },
  });
  return res.json({
    success: response ? true : false,
    mes: response ? "Deleted" : "Something went wrong",
  });
});

module.exports = {
  createNewPropertyType,
  getPropertyType,
  updatePropertyType,
  removePropertyType,
};
