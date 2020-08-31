const express = require('express')
const router = express.Router()
const rescue = require('express-rescue')

// _______________________ controllers ________________________
const { signup, signin, signout } = require('../controllers/auth')

// _______________________ validators ________________________
const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/auth')
const { runValidation } = require('../validators/index')

// _______________________ routes ________________________
router.post('/signup', userSignupValidator, runValidation, rescue(signup))
router.post('/signin', userSigninValidator, runValidation, rescue(signin))
router.get('/signout', signout)

module.exports = router
