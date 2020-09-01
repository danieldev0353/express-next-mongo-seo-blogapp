const express = require('express')
const router = express.Router()
const rescue = require('express-rescue')
const { read } = require('../controllers/user')

const { authMiddleware } = require('../middlewares/auth')

//_________________________________________________________
router.get('/profile', authMiddleware, rescue(read))

module.exports = router
