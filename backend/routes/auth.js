const express = require('express')
const router = express.Router()
const rescue = require('express-rescue')

const {
  signup,
  signin,
  signout,
  requireSignin,
} = require('../controllers/auth')

const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/auth')
const { runValidation } = require('../validators/index')

router.post('/signup', userSignupValidator, runValidation, rescue(signup))
router.post('/signin', userSigninValidator, runValidation, rescue(signin))
router.get('/signout', signout)

router.get('/secret', requireSignin, (req, res) => {
  res.json({
    message: 'you have access to secret page ' + JSON.stringify(req.user),
  })
})

module.exports = router
