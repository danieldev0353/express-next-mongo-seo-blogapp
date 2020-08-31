const express = require('express')
const router = express.Router()
const rescue = require('express-rescue')
const { signup, signin, signout } = require('../controllers/auth')

//_________________________________________________________
const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/auth')
const { runValidation } = require('../validators/index')

//_________________________________________________________
router.post('/signup', userSignupValidator, runValidation, rescue(signup))
router.post('/signin', userSigninValidator, runValidation, rescue(signin))
router.get('/signout', signout)

module.exports = router
