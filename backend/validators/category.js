const { check } = require('express-validator')
const { runValidation } = require('../validators/index')

exports.categoryCreateValidator = [
  check('name').trim().not().isEmpty().withMessage('Name is required'),
  runValidation,
]
