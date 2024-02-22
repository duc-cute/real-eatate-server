/** @format */

const { errHandler, notFound } = require("../middlewares/errHandler");
const auth = require("./auth");
const user = require("./user");
const initRoute = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/user", user);
  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoute;
