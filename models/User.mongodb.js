const User = require('./User')

const findByEmail = async (email) => {
  return await User.findOne({email}).select('+password')  
}

const findByField = async (key, resetPasswordToken) => {
  return await User.findOne({resetPasswordToken})
}

const findById = async (id) => {
  return await User.findById(id)
}

const updateCustom = async function(user) {  
  return await User.updateOne({_id:user._id}, user)
}

const createCustom = async function(user) {
  return await User.create(user)
}

const addDummyUsers = async function() {
  const ignoredFields = ['id','created_at', '__v', /detail.*_info/];
  return dummy(User, {
    ignore: ignoredFields,
    returnDate: true
  })
}

const deleteUserFromDB = async function(id) {
  return await User.findByIdAndDelete(id)
}

const sendUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '0')
    const perPage = parseInt(process.env.PER_PAGE)
    const total = await User.countDocuments()
    const users = await User.find().limit(perPage).skip(perPage*page)
    if(!users) {
      return next(new ErrorResponse('No user founds in Database', 404))
    }

    res.status(200).json({
      success: true,
      users,
      totalPages: Math.ceil(total / process.env.PER_PAGE)
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
  deleteUserFromDB,
  sendUsers
}