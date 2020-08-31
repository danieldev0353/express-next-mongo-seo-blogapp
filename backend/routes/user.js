const express = require('express')
const router = express.Router()
const rescue = require('express-rescue')

// _______________________ middlewares ________________________
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require('../middlewares/auth')

// _______________________ controllers ________________________
const { read } = require('../controllers/user')

// _______________________ routes ________________________
router.get('/profile', requireSignin, rescue(authMiddleware), rescue(read))

module.exports = router
