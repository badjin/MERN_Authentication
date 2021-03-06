const router = require('express').Router()
const { requireSignin, adminMiddleware } = require('../middlewares/auth')
const { readController, updateController } = require('../controllers/user.controller');

router.get('/user/:id', requireSignin, readController);
router.put('/user/update', requireSignin, updateController);
router.put('/admin/update', requireSignin, adminMiddleware, updateController);

module.exports = router;