const express = require('express')
const router = express.Router()
const rescue = require('express-rescue')
const { signup, signin, signout } = require('../controllers/auth')

//_________________________________________________________
const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/auth')

//_________________________________________________________
router.post('/signup', userSignupValidator, rescue(signup))
router.post('/signin', userSigninValidator, rescue(signin))
router.get('/signout', signout)

module.exports = router
