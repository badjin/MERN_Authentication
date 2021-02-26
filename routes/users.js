const router = require('express').Router()
const {
  register,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/users')

router.post('/register', register)

router.post('/login', login)

router.post('/forgotpassword', forgotPassword)

router.put('/resetpassword/:resetToken', resetPassword)

module.exports = router