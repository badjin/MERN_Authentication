const multer = require('multer')
const path = require('path')

// Set storage => file name and destinatio
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, `./${process.env.PROFILE_FOLDER}`)
  },
  filename: (req, file, cb) => {
    // Generate unique name for each image
    const fileName = `lilac-${req.body.id}-${Date.now()}${path.extname(file.originalname)}`
    req.body.avatar = fileName
    cb(null, fileName)
  }
})

// File filter
const fileFilter = (req, file, cb) => {
  cb(null, true)
}

let upload = multer({ storage, fileFilter })

// Export upload as single file you can use multiple
module.exports = upload.single('profileImage')