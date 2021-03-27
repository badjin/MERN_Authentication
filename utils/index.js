const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.createToken = (payload, secret, expires) => jwt.sign(payload, secret, {expiresIn: expires})

exports.successLogin = (res, user) => {
  const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {expiresIn: process.env.AUTH_EXPIRES_IN})
  res.status(200).json({
    success: true,
    user: { 
      id: user.id,
      email: user.email,
      name: user.name, 
      role: user.role,
      avatar: user.avatar,
      googleAccount: user.googleAccount
    },
    token
  })
}

exports.getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)    
}