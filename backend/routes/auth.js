const express = require('express')
const router = express.Router()
const rescue = require('express-rescue')

const { signup } = require('../controllers/auth')
const { runValidation } = require('../validators/index')
const { userSignupValidator } = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, rescue(signup))

module.exports = router
