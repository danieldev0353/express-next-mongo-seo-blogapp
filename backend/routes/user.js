const express = require('express')
const router = express.Router()
const rescue = require('express-rescue')
const { read } = require('../controllers/user')

const { requireSignin, authMiddleware } = require('../middlewares/auth')

//_________________________________________________________
router.get('/profile', requireSignin, authMiddleware, rescue(read))

module.exports = router
