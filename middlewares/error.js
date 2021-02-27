const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  if (err.code === 11000) {
    const message = 'An account with this email already exist.'
    error = new ErrorResponse(message, 400)
  }

  if (err.code === 'ValidationError') {
    const message = object.value(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  })
}

module.exports = errorHandler