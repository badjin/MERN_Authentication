const {
    check
} = require('express-validator')

exports.registerValidator = [
    check('name', 'Name is required').notEmpty()
    .isLength({
        min: 4,
        max: 32
    }).withMessage('Name must be between 3 to 32 characters'),

    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),

    check('password', 'Please add a password').notEmpty(),
    check('password').isLength({
        min: 8
    }).withMessage('Password must contain at least 8 characters').matches(/\d/).withMessage('Password must contain a number')
]

exports.loginValidator = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'Please add a password.').notEmpty(),
    check('password').isLength({
        min: 8
    }).withMessage('Password must contain at least 8 characters').matches(/\d/).withMessage('Password must contain a number')
]


exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must be at least  8 characters long')
];