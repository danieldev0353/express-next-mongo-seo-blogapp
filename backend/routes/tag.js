const express = require('express')
const router = express.Router()
const er = require('express-rescue')
const { create, list, read, remove } = require('../controllers/tag')

//_________________________________________________________
const { createTagValidator } = require('../validators/tag')
const { adminMiddleware } = require('../middlewares/auth')

//_________________________________________________________
router.post('/tag', adminMiddleware, createTagValidator, er(create))
router.get('/tags', er(list))
router.get('/tag/:slug', er(read))
router.delete('/tag/:slug', adminMiddleware, er(remove))

module.exports = router
