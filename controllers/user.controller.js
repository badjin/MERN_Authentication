const User = require('../models/User')
const fs = require('fs')

const sendUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '0')
    const perPage = parseInt(process.env.PER_PAGE)
    const total = await User.countDocuments()
    const users = await User.find().limit(perPage).skip(perPage*page)
    if(!users) {
      return next(new ErrorResponse('No user founds in Database', 404))
    }

    res.status(200).json({
      success: true,
      users,
      totalPages: Math.ceil(total / process.env.PER_PAGE)
    })
  } catch (error) {
    next(error)
  }
}

exports.getUser = async (req, res, next) => {
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
              id: user.id,
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

exports.updateUser = async (req, res,next) => {
  const { id, name, password, avatar } = req.body
  
  try {
    const user = await User.findById(id)
    user.name = name
    if(avatar) {
      // Before updating, delete old profile image
      // Users have only one image for profile
      if(user.avatar !== 'default.png'){
        fs.unlink(`./${process.env.PROFILE_FOLDER}/${user.avatar}`, (error) => {
          if(error) console.log(error)
        })
      }
      user.avatar = avatar
    } 

    password && (user.password = password)

    await user.save()

    res.status(200).json({
      success: true,
      user: { 
              id: user.id,
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

exports.getUsers = async (req, res, next) => {

  await sendUsers(req, res, next)
} 

exports.deleteUser = async (req, res, next) => {

  try {
    const user = await User.findOneAndDelete({email: req.body.email})
    if(!user) {
      return next(new ErrorResponse('Failed to delete the user.', 404))
    }

    if(req.body.avatar != 'default.png') {
      fs.unlink(`./${process.env.PROFILE_FOLDER}/${req.body.avatar}`, (error) => {
        if(error) console.log(error)
      })
    }

    await sendUsers(req, res, next)
  } catch (error) {
    next(error)
  }
}

exports.updateUsers = async (req, res, next) => {
  const { id, name, avatar, role } = req.body
  
  try {
    const user = await User.findById(id)
    user.name = name

    if(avatar) {
      // Before updating, delete old profile image
      // Users have only one image for profile
      if(user.avatar !== 'default.png'){
        fs.unlink(`./${process.env.PROFILE_FOLDER}/${user.avatar}`, (error) => {
          if(error) console.log(error)
        })
      }
      user.avatar = avatar
    } 

    user.role = role

    await user.save()
    
    await sendUsers(req, res, next)
  } catch (error) {
    next(error)
  }
}