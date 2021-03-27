const jwt = require('jsonwebtoken')
const path = require('path')
const Database = path.join(__dirname, `../models/User.${process.env.DATABASE}`)
const User = require(Database)
const ErrorResponse = require('../utils/errorResponse')
const fs = require('fs')

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

    // req.body.id = user.id
    next()

  } catch (error) {
    return next(new ErrorResponse('Token has expired. Please login again.', 401))
  }
}

exports.adminMiddleware = async (req, res, next) => {
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

    if (user.role !== 'admin') {
      return next(new ErrorResponse('Admin resource. Access denied.', 401))      
    }
    // req.profile = user
    next()

  } catch (error) {
    return next(new ErrorResponse('Token has expired. Please login again.', 401))
  }
}

exports.profileMiddleware = (req, res, next) => {
  if (typeof(req.file) === 'undefined') {
      return next()
  }    

  if (!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg') && !(req.file.mimetype).includes('svg')) {
      fs.unlinkSync(req.file.path)
      return next(new ErrorResponse('File not supported', 400))
  }

  if (req.file.size > 1024 * 1024 * 2) {
      fs.unlinkSync(req.file.path)
      return next(new ErrorResponse('The file must be less than 2MB', 400))
  }    

  next()
}