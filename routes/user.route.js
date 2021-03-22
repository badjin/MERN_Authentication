const router = require('express').Router()
const { requireSignin, adminMiddleware, profileMiddleware } = require('../middlewares/auth')
const uploadMulter = require('../middlewares/uploadImage')
const { readController, updateController } = require('../controllers/user.controller')

// const {
//   profileImageValidator
// } = require('../middlewares/auth')

router.get('/user/:id', requireSignin, readController)
router.put('/user/update', 
  requireSignin, 
  uploadMulter, 
  profileMiddleware,
  updateController
)

router.put('/admin/update', 
  requireSignin, 
  adminMiddleware, 
  uploadMulter, 
  // profileMiddleware,
  updateController
)

// router.put('/upload',uploadMulter, (req, res) => {
//   // let name = req.body.name
//   let image = req.file.path
//   console.log(req.body, image)
//   res.status(200).json({
//     success: true
//   })
// })

module.exports = router