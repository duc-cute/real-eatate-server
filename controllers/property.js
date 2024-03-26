/** @format */

const asyncHandler = require("express-async-handler");
const db = require("../models");
const redis = require("../config/redis.config");
const { Op } = require("sequelize");

const getProperties = asyncHandler(async (req, res) => {
  const { limit, page, field, sort, name, address, start, end, ...query } =
    req.query;
  let options = {};
  if (name) query.name = { [Op.iLike]: `%${name}%` };
  if (address) query.address = { [Op.iLike]: `%${address}%` };

  if (sort) {
    let order = sort.split(",");
    order = order.map((el) =>
      el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
    );
    options.order = order;
  }

  query.price = {
    [Op.gte]: start || 0,
    [Op.lte]: end || Number.MAX_SAFE_INTEGER,
  };

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
    const alreadyGetAll = await redis.get("get-property-type");
    if (alreadyGetAll)
      return res.json({
        success: true,
        mes: "Got",
        propertyType: JSON.parse(alreadyGetAll),
      });
    const response = await db.Property.findAndCountAll({
      where: query,
      ...options,
      include: [
        {
          model: db.User,
          as: "rOwner",
          attributes: ["name", "email", "phone", "avatar", "address"],
        },
        {
          model: db.User,
          as: "rPostedBy",
          attributes: ["name", "email", "phone", "avatar", "address"],
        },
      ],
    });
    await redis.set("get-property-type", JSON.stringify(response));
    return res.json({
      success: response?.count > 0,
      mes: response?.count > 0 ? "Got" : "Cannot get property type",
      property: response,
    });
  }
  const offset = (page - 1) * limit;
  if (offset) options.offset = offset;
  options.limit = +limit;
  const response = await db.Property.findAndCountAll({
    where: query,
    ...options,
    include: [
      {
        model: db.User,
        as: "rOwner",
        attributes: ["name", "email", "phone", "avatar", "address"],
      },
      {
        model: db.User,
        as: "rPostedBy",
        attributes: ["name", "email", "phone", "avatar", "address"],
      },
    ],
  });

  return res.json({
    success: response?.count > 0,
    mes: response.count > 0 ? "Got" : "Cannot get property type",
    property: { ...response, page, limit },
  });
});

module.exports = {
  getProperties,
};
