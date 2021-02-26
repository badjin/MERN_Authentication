const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

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

exports.forgotPassword = (req, res, next) => {
  res.send("Forgot Password Route")
}

exports.resetPassword = (req, res, next) => {
  res.send("Reset Password Route")
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({
    success: true,
    token
  })
}