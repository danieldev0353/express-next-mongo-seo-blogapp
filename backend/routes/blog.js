const express = require('express')
const router = express.Router()
const er = require('express-rescue')
const { create } = require('../controllers/blog')

//_________________________________________________________
const { adminMiddleware } = require('../middlewares/auth')

//_________________________________________________________
router.post('/blog', adminMiddleware, er(create))

module.exports = router
