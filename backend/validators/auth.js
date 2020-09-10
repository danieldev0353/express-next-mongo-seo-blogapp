const { check } = require('express-validator')
const { runValidation } = require('../validators/index')

exports.userSignupValidator = [
  check('name').trim().not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  runValidation,
]

exports.userSigninValidator = [
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  runValidation,
]

exports.forgotPasswordValidator = [
  check('email').isEmail().withMessage('Must be a valid email address'),
  runValidation,
]

exports.resetPasswordValidator = [
  check('newPassword')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  check('resetPasswordToken')
    .not()
    .isEmpty()
    .isLength({ min: 120 })
    .withMessage('Password must be at least 120 characters long'),
  runValidation,
]
