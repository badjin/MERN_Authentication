const router = require('express').Router()
const { requireSignin, adminMiddleware, profileMiddleware } = require('../middlewares/auth')
const uploadMulter = require('../middlewares/uploadImage')
const { 
  getUser, 
  updateUser, 
  getUsers, 
  updateUsers,
  deleteUser 
} = require('../controllers/user.controller')

router.get('/user/:id', requireSignin, getUser)
router.put('/user/update', 
  requireSignin, 
  uploadMulter, 
  profileMiddleware,
  updateUser
)

router.get('/admin/users', requireSignin, adminMiddleware, getUsers)
router.put('/admin/update', requireSignin, adminMiddleware, updateUsers)
router.post('/admin/delete', requireSignin, adminMiddleware, deleteUser)

module.exports = router