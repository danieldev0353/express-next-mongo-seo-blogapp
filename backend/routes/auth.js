const express = require('express')
const router = express.Router()
const rescue = require('express-rescue')

const { signup, signin } = require('../controllers/auth')
const { runValidation } = require('../validators/index')
const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, rescue(signup))
router.post('/signin', userSigninValidator, runValidation, rescue(signin))

module.exports = router
