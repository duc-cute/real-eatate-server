/** @format */

const { errHandler } = require("../middlewares/errHandler");
const auth = require("./auth");
const initRoute = (app) => {
  app.use("/api/auth", auth);
  app.use(errHandler);
};

module.exports = initRoute;
