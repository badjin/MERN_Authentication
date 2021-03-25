const router = require('express').Router()
const { requireSignin, adminMiddleware, profileMiddleware } = require('../middlewares/auth.firebase')
// const { requireSignin, adminMiddleware, profileMiddleware } = require('../middlewares/auth')
const uploadMulter = require('../middlewares/uploadImage')
const { 
  getUser, 
  updateUser, 
  getUsers, 
  updateUsers,
  deleteUser 
} = require('../controllers/user.firebase')
// } = require('../controllers/user.controller')

router.get('/user/:id', requireSignin, getUser)
router.put('/user/update', 
  requireSignin, 
  uploadMulter, 
  profileMiddleware,
  updateUser
)

router.get('/admin/users', adminMiddleware, getUsers)
router.put('/admin/update', adminMiddleware, updateUsers)
router.post('/admin/delete', adminMiddleware, deleteUser)

module.exports = router