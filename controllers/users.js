const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body

  // validate
  if (!email || !password || !name) {
    return next(new ErrorResponse('Not all fields have been entered.', 400))
  }


  try {
    const user = await User.create({
      name, email, password
    })

    sendToken(user, 200, res)

  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  // validate
  if (!email || !password){
    return next(new ErrorResponse('Not all fields have been entered.', 400))
  }

  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return next(new ErrorResponse('No account with this email has been registered.', 401))
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401))
    }

    sendToken(user, 200, res)

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
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    
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

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({
    success: true,
    token
  })
}