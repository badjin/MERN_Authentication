const User = require('../models/User')

exports.readController = async (req, res) => {
    const userId = req.params.id
    try {
      const user = await User.findById(userId)
      if(!user) {
        return next(new ErrorResponse('No user found with this id.', 404))
      }

      res.status(200).json({
        success: true,
        user: { 
                id: user._id,
                email: user.email,
                name: user.name, 
                role: user.role 
              }
      })
    } catch (error) {
      next(error)
    }
}

exports.updateController = (req, res) => {

}