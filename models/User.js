const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a user name."]
  },
  email: {
    type: String,
    required: [true, "Please provide a email."],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email."
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
    minlength: [8, "Password must be at least 8 characters long."],
    select: false // not send this when requested from client
  },
  // salt: String,
  role: {
    type: String,
    default: 'subscriber'
  },
  resetPasswordLink: {
    data: String,
    default: ''
  },
  // avatar: {
  //   type: String,
  //   default: ""
  // },  
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {timestamps: true})

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// methods
UserSchema.methods = {
  matchPassword: async function(password) {
    return await bcrypt.compare(password, this.password)
  },

  getSignedToken: function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
  },

  getResetPasswordToken: function() {
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")      
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000) //현재 기준 10분간 유효

    return resetToken
  }
}

// UserSchema.methods.matchPassword = async function(password) {
//   return await bcrypt.compare(password, this.password)
// }

// UserSchema.methods.getSignedToken = function() {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
// }

// UserSchema.methods.getResetPasswordToken = function() {
//   const resetToken = crypto.randomBytes(20).toString('hex')

//   // Hash token (private key) and save to database
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
    
//   this.resetPasswordExpire = Date.now() + 10 * (60 * 1000) //현재 기준 10분간 유효

//   return resetToken
// }

module.exports = mongoose.model('User', UserSchema)