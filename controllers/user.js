const fs = require('fs')
const path = require('path')
const Database = path.join(__dirname, `../models/User.${process.env.DATABASE}`)
const User = require(Database)
const { getHashedPassword } = require('../utils')


exports.getUser = async (req, res, next) => {
  const userId = req.params.id  
  
  if(!userId) return next(new ErrorResponse('No user found with this ID.', 404))

  try {
    const user = await User.findById(userId)

    if(!user) {
      return next(new ErrorResponse('No user found with this ID.', 404))
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
  let { id, name, password, avatar } = req.body
  
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

    if(password) {
      password = await getHashedPassword(password)
      user.password = password
    }
    
    await User.updateCustom(user)

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

  await User.sendUsers(req, res, next)
}

exports.deleteUser = async (req, res, next) => {

  try {
    // await addDummyUsers()
    const user = await User.deleteUserFromDB(req.body.id)
    if(!user) {
      return next(new ErrorResponse('Failed to delete the user.', 404))
    }

    if(req.body.avatar != 'default.png') {
      fs.unlink(`./${process.env.PROFILE_FOLDER}/${req.body.avatar}`, (error) => {
        if(error) console.log(error)
      })
    }

    await User.sendUsers(req, res, next)
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

    await User.updateCustom(user)

    await User.sendUsers(req, res, next)    
  } catch (error) {
    next(error)
  }
}

