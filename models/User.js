const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
  role: {
    type: String,
    default: 'customer'
  },
  avatar: {
    type: String,
    default: 'default.png'
  },
  resetPasswordToken: {
    type: String,
    default: ''
  },
  googleAccount:{
    type: Boolean,
    default: false
  }
}, {timestamps: true})

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next()
  }
  this.resetPasswordToken = ''
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.matchPassword = async function(password) {  
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
