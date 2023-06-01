const AppError = require("./appError");

const handleErrorNotHasId = (error) => {
  const message = `Invalid ${error.path} : ${error.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "Error",
    message: err.message,
    error: err,
    tack: err.tack,
  });
};

const sendErrorPro = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Some thing went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    let newError;
    if (err.name === "CastError") {
      newError = handleErrorNotHasId(err);
      sendErrorPro(newError, res);
    } else {
      sendErrorPro(err, res);
    }
  } else if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }
};
