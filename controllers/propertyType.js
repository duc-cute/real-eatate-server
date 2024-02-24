/** @format */

const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");

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
  const { limit, page, field, type, name, ...query } = req.query;
  let options = {};
  if (name) query.name = { [Op.iLike]: `%${name}%` };
  if (field) {
    const attributes = field.split(",");
    const isExclude = attributes.some((el) => el.startsWith("-"));

    if (isExclude)
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")),
      };
    else options.attributes = attributes;
  }

  const response = await db.PropertyType.findAll({ where: query, ...options });
  return res.json({
    success: response.length > 0,
    mes: response.length > 0 ? "Got" : "Cannot get property type",
    propertyType: response,
  });
});

module.exports = { createNewPropertyType, getPropertyType };
