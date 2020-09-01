const { check } = require('express-validator')
const { runValidation } = require('../validators/index')

exports.createTagValidator = [
  check('name').trim().not().isEmpty().withMessage('Name is required'),
  runValidation,
]
