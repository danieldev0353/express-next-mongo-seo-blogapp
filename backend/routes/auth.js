const express = require('express')
const router = express.Router()
const er = require('express-rescue')
const {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth')

//_________________________________________________________
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('../validators/auth')

//_________________________________________________________
router.post('/signup', userSignupValidator, er(signup))
router.post('/signin', userSigninValidator, er(signin))
router.get('/signout', signout)
router.post('/forgot-password', forgotPasswordValidator, er(forgotPassword))
router.post('/reset-password', resetPasswordValidator, er(resetPassword))

module.exports = router
