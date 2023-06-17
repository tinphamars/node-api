const auth = require("./auth");
const admin = require("./admin");
const products = require("./product");
const AppError = require("../utils/appError");
const globalErrorHandler = require("../utils/globalErrorHandle");
const conversation = require("./conversation");

const apiRouter = (app) => {
  // app.use('/api/post', post)

  app.use("/api/products", products);
  app.use("/api/users", auth);
  app.use("/api/conversations", conversation);
  app.use("/admin", admin);

  app.all("*", (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
  });

  app.use(globalErrorHandler);
};

module.exports = apiRouter;
