const router = require('express').Router()
const { requireSignin, adminMiddleware, profileMiddleware } = require('../middlewares/auth')
const uploadMulter = require('../middlewares/uploadImage')
const { 
  getUser, 
  updateUser, 
  getUsers, 
  updateUsers,
  deleteUser 
} = require('../controllers/user')

router.get('/user/:id', requireSignin, getUser)
router.put('/user/update', 
  requireSignin, 
  uploadMulter, 
  profileMiddleware,
  updateUser
)

router.get('/admin/users', adminMiddleware, getUsers)
router.put('/admin/update', 
  adminMiddleware,
  uploadMulter, 
  profileMiddleware,
  updateUsers
)
router.post('/admin/delete', adminMiddleware, deleteUser)

module.exports = router