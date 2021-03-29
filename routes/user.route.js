const router = require('express').Router()
const fs = require('fs')

const { requireSignin, adminMiddleware, profileMiddleware } = require('../middlewares/auth')
const uploadMulter = require('../middlewares/uploadImage')
const { 
  getUser, 
  updateUser, 
  getUsers, 
  updateUsers,
  deleteUser 
} = require('../controllers/user')
const settings = require('../config/settings.json')

router.get('/user/:id', requireSignin, getUser)
router.put('/user/update', 
  requireSignin, 
  uploadMulter, 
  profileMiddleware,
  updateUser
)

router.get('/settings', (req, res, next) => {
  try {    
    res.status(200).json({
      success: true,
      settings
    })
  } catch (error) {
    next(error)
  }
})

router.get('/admin/users', adminMiddleware, getUsers)

router.put('/admin/settings/update', adminMiddleware, async (req, res, next) => {
  try {
    await fs.writeFileSync('./config/settings.json', JSON.stringify(req.body), 'utf8')

    res.status(200).json({
      success: true
    })
  } catch (error) {
    next(error)    
  }
})

router.put('/admin/update', 
  adminMiddleware,
  uploadMulter, 
  profileMiddleware,
  updateUsers
)
router.post('/admin/delete', adminMiddleware, deleteUser)

module.exports = router