const router = require('express').Router()
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  activationEmail
} = require('../controllers/users')

router.post('/register', register)

router.post('/login', login)

router.post('/forgotpassword', forgotPassword)

router.put('/resetpassword/:resetToken', resetPassword)

router.put('/activation/:activationToken', activationEmail)

module.exports = router