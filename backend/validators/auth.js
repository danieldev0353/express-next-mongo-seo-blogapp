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
