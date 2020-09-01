const express = require('express')
const router = express.Router()
const er = require('express-rescue')
const { signup, signin, signout } = require('../controllers/auth')

//_________________________________________________________
const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/auth')

//_________________________________________________________
router.post('/signup', userSignupValidator, er(signup))
router.post('/signin', userSigninValidator, er(signin))
router.get('/signout', signout)

module.exports = router
