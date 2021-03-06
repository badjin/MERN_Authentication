const router = require('express').Router()
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  activationEmail,
  googleLogin
} = require('../controllers/auth.controller')
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../utils/validationCheck')

router.post('/register', registerValidator, register)

router.post('/login', loginValidator, login)

router.post('/forgotpassword', forgotPasswordValidator, forgotPassword)

router.put('/resetpassword', resetPasswordValidator, resetPassword)

router.post('/activation', activationEmail)

router.post('/googlelogin', googleLogin)

module.exports = router