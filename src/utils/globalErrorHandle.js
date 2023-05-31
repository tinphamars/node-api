const AppError = require("./appError");

const handleErrorNotHasId = (error) => {
  const message = `IsValid ${error.message} : ${error.value}`;
  new AppError(message, 400);
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'Error',
    message: err.message,
    error: err,
    tack: err.tack
  })
}

const sendErrorPro = (err, res) => {
  console.log('err', err.name)
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
    })
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Some thing went wrong!',
    })
  }
}

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    let error = err instanceof Error ? { ...err } : { message: err }
    if (err.name === 'CastError') {
      (error) => handleErrorNotHasId(error)
    }

    sendErrorPro(err, res)
  } else if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res)
  }
}