const { db } = require('../config/dbFirebase')

const getUser = (userSnapShot) => {
  return {
    id: userSnapShot.id,
    name: userSnapShot.data().name,
    email: userSnapShot.data().email,
    password: userSnapShot.data().password,
    role: userSnapShot.data().role,
    avatar: userSnapShot.data().avatar,
    resetPasswordToken: userSnapShot.data().resetPasswordToken,
    googleAccount: userSnapShot.data().googleAccount
  }
}

const getUserWithoutPassword = (userSnapShot) => {
  return {
    id: userSnapShot.id,
    name: userSnapShot.data().name,
    email: userSnapShot.data().email,
    role: userSnapShot.data().role,
    avatar: userSnapShot.data().avatar,
    googleAccount: userSnapShot.data().googleAccount
  }
}

const saveUserWithoutId = (user) => {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    avatar: user.avatar,
    role: user.role,
    resetPasswordToken: user.resetPasswordToken,
    googleAccount: user.googleAccount
  }
}

exports.findByEmail = async (email) => {
  const usersRef = db.collection('users')

  const snapshot = await usersRef.where('email', '==', email).get()
  if (snapshot.empty) return false

  let user = ''
  snapshot.forEach(doc => {      
    user = getUser(doc)
  })
  return user
}

exports.findOne = async (key, value) => {
  const usersRef = db.collection('users')

  const snapshot = await usersRef.where(key, '==', value).get()
  if (snapshot.empty) return false

  let user = ''
  snapshot.forEach(doc => {      
    user = getUser(doc)
  })
  return user
}

exports.findById = async (id) => {
  const usersRef = db.collection('users')

  try {
    const snapshot = await usersRef.doc(id).get()
    if (snapshot.empty) return false
    
    return getUser(snapshot)
  } catch (error) {
    throw error
  }  
}

exports.deleteUser = async (id) => {
  try {
    await db.collection('users').doc(id).delete()
    return true
  } catch (error) {
    throw error
  }
}

exports.findAll = async () => {
  const usersRef = db.collection('users')

  const users = await usersRef.get()
  if (users.empty) return false

  const usersArray = []
  users.forEach(doc => {
    const user = getUserWithoutPassword(doc)
    usersArray.push(user)
  })
  return usersArray
}

exports.save = async (user) => {
  const saveUser = saveUserWithoutId(user)
  await db.collection('users').doc().set(saveUser)
}

exports.update = async (user) => {
  const saveUser = saveUserWithoutId(user)
  await db.collection('users').doc(user.id).set(saveUser)
}