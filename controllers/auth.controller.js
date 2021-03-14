const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { OAuth2Client } = require('google-auth-library')
const dummy = require('mongoose-dummy')

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0]
    return next(new ErrorResponse(firstError, 422))
  } else {
    const user = await User.findOne({email})
    if(user) return next(new ErrorResponse('An account with this email already exist.', 400))    
  }  

  try {

    // Dummy User creater
    // for (let i = 0; i < 100; i++) {
    //   let randomUser = dummyUserCreater()
    //   User.create({
    //     name: randomUser.name,
    //     email: randomUser.email,
    //     password: '12345678'
    //   })
    // }    

    const activationToken = createToken({ name, email, password }, process.env.ACTIVATION_SECRET, process.env.ACTIVATE_EXPIRES_IN)
    const activationURL = `${process.env.FRONTEND_URL}/users/activate/${activationToken}`

    const message = `
      <h2>Thank you for registering!</h2>
      <p>Use the link below to enter the <b>Lilac TV</b> up to 15 minutes before the start.</p>
      <a href=${activationURL} clicktracking=off>${activationURL}</a>
      <hr />
      <p>This email may containe sensetive information.</p>
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
            const token = createToken({ id: user._id }, process.env.AUTH_SECRET, process.env.AUTH_EXPIRES_IN)
            res.status(200).json({
              success: true,
              message: 'Your account has been successfully registered.',
              user: {name: user.name, email: user.email, role: user.role},
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

    if (user.googleAccount) {
      return next(new ErrorResponse('This account should be signen in with Google.', 401))
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401))
    }
    
    successLogin(res, user)

  } catch (error) {
    next(error)
  }
}

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0]
    return next(new ErrorResponse(firstError, 422))    
  }

  try {
    const user = await User.findOne({email})

    if(!user){
      return next(new ErrorResponse('This email is not registered.', 404))
    }

    if (user.googleAccount) {
      return next(new ErrorResponse('This account should be signen in with Google.', 401))
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const token = createToken({id: user._id}, process.env.RESET_SECRET, process.env.RESET_EXPIRES_IN)
    
    // Create reset url to email to provided email
    const resetUrl = `${process.env.FRONTEND_URL}/users/password/reset/${token}`
    
    const message = `
      <h1>Please use the following link to reset your password.</h1>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      <p>This email may containe sensetive information.</p>
      <p>${process.env.FRONTEND_URL}</p>
    `    

    try {

      await user.updateOne({ resetPasswordToken: token }, (err) => {
        if(err) {
          return next(new ErrorResponse('Database connection error on user password forgot request.', 404))
        }

        sendEmail({
          to: user.email,
          subject: 'Password Reset Request',
          text: message
        })
  
        res.status(200).json({
          success: true,
          message: `Email has been sent to ${email}. Please check your email.`
        })
      })

    } catch (error) {      
      user.resetPasswordToken = undefined
      await user.save()
      return next(new ErrorResponse('Email could not be sent.', 404))
    }

  } catch (error) {
    next(error)
  }
}

exports.resetPassword = async (req, res, next) => {
  const { resetPasswordToken, newPassword } = req.body;

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0]
    return next(new ErrorResponse(firstError, 422))    
  }  

  if (!resetPasswordToken) {
    return next(new ErrorResponse('Invalid Token', 400))
  }

  try {
    const verified = jwt.verify(resetPasswordToken, process.env.RESET_SECRET)    

    if (!verified) {
      return next(new ErrorResponse('This link has been expired. Please try again.', 401))
    }   

    const user = await User.findOne({ resetPasswordToken })
    if(!user){
      return next(new ErrorResponse('Invalid Token', 400))
    }

    user.password = newPassword

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Great! Now you can login with your new password.'
    })

  } catch (error) {
    console.log(error)
    next(error)
  }
}

const client = new OAuth2Client(process.env.GOOGLE_OAUTH2)
exports.googleLogin = async (req, res, next) => {
  // Get token from request
  const { idToken } = req.body

  try {
    const response = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_OAUTH2})
    const { email_verified, name, email } = response.payload
    if(!email_verified) {
      return next(new ErrorResponse('Google login failed. Try again', 400))
    }

    try {
      const user = await User.findOne({ email }).select('+password')
      if (!user) {
        let password = email + process.env.AUTH_SECRET
        const user = new User({ name, email, password, googleAccount: true })
        User.create(user)
          .then(() => {
            successLogin(res, user)
          })
          .catch(() => next(new ErrorResponse('User signin failed with Google', 400)))
        
      } else {
        successLogin(res, user)
      }
  
    } catch (error) {
      next(error)
    }

  } catch (error) {
    next(new ErrorResponse('User signin failed with Google', 400))
  }

}

const createToken = (payload, secret, expires) => jwt.sign(payload, secret, {expiresIn: expires})

const successLogin = (res, user) => {
  const token = createToken({ id: user._id }, process.env.AUTH_SECRET, process.env.AUTH_EXPIRES_IN)
  res.status(200).json({
    success: true,
    user: { 
      id: user._id,
      email: user.email,
      name: user.name, 
      role: user.role 
    },
    token
  })
}

const dummyUserCreater = () => {
  const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];
  return dummy(User, {
    ignore: ignoredFields,
    returnDate: true
  })
}