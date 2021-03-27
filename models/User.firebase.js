const { db } = require('../config/dbFirebase')
const dummyUsers = require('./MOCK_DATA.json')
const { getHashedPassword } = require('../utils')

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

const dummyUser = (user) => {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    avatar: 'default.png',
    role: 'customer',
    resetPasswordToken: '',
    googleAccount: false
  }
}

const findByEmail = async (email) => {
  const usersRef = db.collection('users')

  const snapshot = await usersRef.where('email', '==', email).get()
  if (snapshot.empty) return false

  let user = ''
  snapshot.forEach(doc => {      
    user = getUser(doc)
  })
  return user
}

const findByField = async (key, value) => {
  
  const usersRef = db.collection('users')

  const snapshot = await usersRef.where(key, '==', value).get()
  if (snapshot.empty) return false

  let user = ''
  snapshot.forEach(doc => {      
    user = getUser(doc)
  })
  return user
}

const findById = async (id) => {
  const usersRef = db.collection('users')

  try {
    const snapshot = await usersRef.doc(id).get()
    if (snapshot.empty) return false
    
    return getUser(snapshot)
  } catch (error) {
    throw error
  }  
}

const deleteUserFromDB = async (id) => {
  try {
    await db.collection('users').doc(id).delete()
    return true
  } catch (error) {
    throw error
  }
}

const createCustom = async (user) => {
  const saveUser = saveUserWithoutId(user)
  await db.collection('users').doc().set(saveUser)
}

const updateCustom = async (user) => {
  const saveUser = saveUserWithoutId(user)
  try {
    
    await db.collection('users').doc(user.id).set(saveUser)
  } catch (error) {
    console.log(error)
  }
  // return saveUser
}

const addDummyUsers = async () => {
  dummyUsers.map(async (user) => {
    user.password = await getHashedPassword('12345678')    
    const addUser = dummyUser(user)
    await db.collection('users').doc().set(addUser)
  })
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

const sendUsers = async (req, res, next) => {
  const usersRef = db.collection('users').orderBy('role')

  try {
    const page = parseInt(req.query.page || '0')
    const perPage = parseInt(process.env.PER_PAGE)

    const usersSnapshot = await usersRef.limit(perPage).offset(page*perPage).get()
    if (usersSnapshot.empty) next(new ErrorResponse('No users found in Database', 404))

    const users = []
    await usersSnapshot.forEach(doc => {
      const user = getUserWithoutPassword(doc)
      users.push(user)
    })

    const total = (await usersRef.get()).size

    if(!users) {
      return next(new ErrorResponse('No users found in Database', 404))
    }

    res.status(200).json({
      success: true,
      users,
      totalPages: Math.ceil(total / perPage)
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { 
  findById, 
  findByEmail,
  findByField,
  createCustom, 
  updateCustom, 
  addDummyUsers,
  sendUsers,
  deleteUserFromDB 
}