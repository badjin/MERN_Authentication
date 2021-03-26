const fs = require('fs')
const { findAll, findById, update, deleteUserFromDB, addDummyUsers } = require('../models/UserFirebase')
const { getHashedPassword } = require('../utils')


exports.getUser = async (req, res, next) => {
  const userId = req.params.id  
  
  if(!userId) return next(new ErrorResponse('No user found with this ID.', 404))

  try {
    const user = await findById(userId)

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
    const user = await findById(id)
    user.name = name
    if(avatar) {
      // Before updating, delete old profile image
      // Users have only one image for profile
      if(user.avatar !== 'default.png'){
        fs.unlink(`./uploads/${user.avatar}`, (error) => {
          if(error) console.log(error)
        })
      }
      user.avatar = avatar
    }

    if(password) {
      password = await getHashedPassword(password)
      user.password = password
    }
    
    await update(user)

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

  try {
    const users = await findAll()
    if(!users) {
      return next(new ErrorResponse('No user found in Database', 404))
    }

    res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {

  try {
    // await addDummyUsers()
    const user = await deleteUserFromDB(req.body.id)
    if(!user) {
      return next(new ErrorResponse('Failed to delete the user.', 404))
    }

    if(req.body.avatar != 'default.png') {
      fs.unlink(`./uploads/${req.body.avatar}`, (error) => {
        if(error) console.log(error)
      })
    }

    const users = await findAll()
    if(!users) {
      return next(new ErrorResponse('No user found in Database', 404))
    }
    
    res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    next(error)
  }
}

exports.updateUsers = async (req, res, next) => {
  const { id, name, avatar, role } = req.body
  
  try {
    const user = await findById(id)
    user.name = name
    if(avatar) {
      // Before updating, delete old profile image
      // Users have only one image for profile
      if(user.avatar !== 'default.png'){
        fs.unlink(`./uploads/${user.avatar}`, (error) => {
          if(error) console.log(error)
        })
      }
      user.avatar = avatar
    } 

    user.role = role

    await update(user)

    const users = await findAll()
    if(!users) {
      return next(new ErrorResponse('No user found in Database', 404))
    }

    res.status(200).json({
      success: true,
      users
    })
    
  } catch (error) {
    next(error)
  }
}

