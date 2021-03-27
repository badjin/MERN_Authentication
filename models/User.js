const mongoose = require('mongoose')

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

UserSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

module.exports = mongoose.model('User', UserSchema)
