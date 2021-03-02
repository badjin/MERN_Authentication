const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0]
    return next(new ErrorResponse(firstError, 422))
    
  } else {
    await User.findOne({email}).exec((err, user) => {
      if (user) {
        return next(new ErrorResponse('An account with this email already exist.', 400))
      }
    })
  }  

  try {
    const activationToken = createActivationToken({ name, email, password })
    const activationURL = `${process.env.FRONTEND_URL}/users/activate/${activationToken}`

    const message = `
      <h2>Thank you for registering!</h2>
      <p>Use the link below to enter the <b>Lilac TV</b> up to 15 minutes before the start.</p>
      <a href=${activationURL} clicktracking=off>${activationURL}</a>
      <hr />
      <p>This email may containe sensetive information</p>
      <p>${process.env.FRONTEND_URL}</p>
    `

    try {
      await sendEmail({
        to: email,
        subject: 'Activation Email',
        text: message
      })

      res.status(200).json({
        success: true,
        message: 'We have sent you an email to activate your email. Please check your email.'
      })

    } catch (error) {
      return next(new ErrorResponse('Email could not be sent.', 404))
    }
  } catch (error) {
    next(error)
  }
}

exports.activationEmail = async (req, res, next) => {
  const {token} = req.body
  if (!token) return next(new ErrorResponse('No activation token. Please try again.', 400))
  
  try {
    await jwt.verify(token, process.env.ACTIVATION_SECRET, (err, decoded) => {
      if (err) {
        return next(new ErrorResponse('This link has been expired. Please register again.', 401))
      } else {
        const { name, email, password } = jwt.decode(token)
        const user = new User({ name, email, password })
        User.create(user)
          .then(() => {
            const token = user.getSignedToken()
            res.status(statusCode).json({
              success: true,
              message: 'Your account has been successfully registered.',
              token
            })
          })
          .catch((err) => next(err))
      }
    })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0]
    return next(new ErrorResponse(firstError, 422))
    
  }

  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return next(new ErrorResponse('No account with this email.', 401))
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401))
    }

    const token = user.getSignedToken()
    res.status(200).json({
      success: true,
      user: { email: user.email, name: user.name, role: user.role },
      token
    })

  } catch (error) {
    next(error)
  }
}

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body

  try {
    const user = await User.findOne({email})

    if(!user){
      return next(new ErrorResponse('This email is not registered.', 404))
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken()

    await user.save()
    
    // Create reset url to email to provided email
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message
      })

      res.status(200).json({
        success: true,
        data: 'Email Sent'
      })

    } catch (error) {      
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      return next(new ErrorResponse('Email could not be sent.', 404))
    }

  } catch (error) {
    next(error)
  }
}

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest('hex')

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt:Date.now() }
    })

    if(!user){
      return next(new ErrorResponse('Invalid Token', 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
      success: true,
      data: 'Password Updated Success.',
      token: user.getSignedToken()
    })

  } catch (error) {
    next(error)
  }
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_SECRET, {expiresIn: '15m'})
}