const router = require('express').Router()
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  activationEmail
} = require('../controllers/auth.controller')

const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordkValidator
} = require('../utils/validationCheck')

router.post('/register', registerValidator, register)

router.post('/login', loginValidator, login)

router.post('/forgotpassword', forgotPassword)

router.put('/resetpassword/:resetToken', resetPassword)

router.post('/activation/', activationEmail)

module.exports = router