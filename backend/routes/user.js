const express = require('express')
const router = express.Router()
const er = require('express-rescue')
const { read, publicProfile } = require('../controllers/user')

const { authMiddleware } = require('../middlewares/auth')

//_________________________________________________________
router.get('/profile', authMiddleware, er(read))
router.get('/user/:username', er(publicProfile))

module.exports = router
