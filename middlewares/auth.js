const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

exports.requireSignin = async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    // Bearer 43hrfoeih35kl4fds9t8532tlejlsr43r
    token = req.headers.authorization.split(' ')[1]
  }

  if(!token){
    return next(new ErrorResponse('No authentication token, authorization denied.', 401))
  }

  try {
    const verified = jwt.verify(token, process.env.AUTH_SECRET)    
    if (!verified) {
      return next(new ErrorResponse('Token verification failed, authorization denied.', 401))
    }
    
    const user = await User.findById(verified.id)
    if(!user) {
      return next(new ErrorResponse('No user found with this id.', 404))
    }

    req.body.id = user._id
    next()

  } catch (error) {
    return next(new ErrorResponse('No authorized to access this route.', 401))
  }
}

exports.adminMiddleware = async (req, res, next) => {
  try {
    console.log(req.user)
    const user = await User.findOne({email: req.body.email})
    if(!user) {
      return next(new ErrorResponse('No user found with this email.', 400))
    }

    if (user.role !== 'admin') {
      return next(new ErrorResponse('Admin resource. Access denied.', 401))      
    }

    req.profile = user
    next()
    
  } catch (error) {
    next(error)
  }
}