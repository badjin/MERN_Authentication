const User = require('../models/User')
const fs = require('fs')

exports.readController = async (req, res, next) => {
  const userId = req.params.id  
  
  if(!userId) return next(new ErrorResponse('No user found with this id.', 404))

  try {
    const user = await User.findById(userId)
    if(!user) {
      return next(new ErrorResponse('No user found with this id.', 404))
    }

    res.status(200).json({
      success: true,
      user: { 
              id: user._id,
              email: user.email,
              name: user.name, 
              role: user.role,
              avatar: user.avatar,
              googleAccount: user.googleAccount
            }
    })
  } catch (error) {
    next(error)
  }
}

exports.updateController = async (req, res,next) => {
  const { id, name, password, avatar } = req.body
  
  try {
    const user = await User.findById(id)
    user.name = name
    if(avatar) {
      // Before updating, delete old profile image
      // Users have only one image for profile
      fs.unlink(`./uploads/${user.avatar}`, (error) => {
        if(error) console.log(error)
      })
      user.avatar = avatar
    } else user.avatar = 'default.png'

    password && (user.password = password)

    await user.save()

    res.status(200).json({
      success: true,
      user: { 
              id: user._id,
              email: user.email,
              name: user.name, 
              role: user.role,
              avatar: user.avatar,
              googleAccount: user.googleAccount
            }
    })
  } catch (error) {
    next(error)
  }
}