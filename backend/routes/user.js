const express = require('express')
const router = express.Router()
const er = require('express-rescue')
const { read } = require('../controllers/user')

const { authMiddleware } = require('../middlewares/auth')

//_________________________________________________________
router.get('/profile', authMiddleware, er(read))

module.exports = router
