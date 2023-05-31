class AppError extends Error {
  constructor(message, statuscode) {
    super(message)
    this.isOperational = true
    this.statuscode = statuscode
    this.status = `${statuscode}`.startsWith('4') ? 'Fail' : 'Error'
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError 