const { JsonWebTokenError } = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    let message = ""

    error.message = err.message  
    
    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = 'An account with this email already exist.'
                break
            default:
                message = "Something went wrong"
                break
        }
        error = new ErrorResponse(message, 400)
    } else if (error.errors) {
        for (let errorName in error.errors) {
            if (error.errors[errorName].message)
                message = error.errors[errorName].message
        }
        error = new ErrorResponse(message, 400)
    } else if(error.name) {
        switch (error.name) {
            case 'JsonWebTokenError':
                message = 'Invalid Token. Please try again.'
                break
            case 'TokenExpiredError':
                message = 'This link has been expired. Please try again.'
                break
            default:
                message = 'TOKEN ERROR'
                break
        }
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    })
}

module.exports = errorHandler