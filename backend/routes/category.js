const express = require('express')
const router = express.Router()
const er = require('express-rescue')
const { create, list, read, remove } = require('../controllers/category')

//_________________________________________________________
const { categoryCreateValidator } = require('../validators/category')
const { adminMiddleware } = require('../middlewares/auth')

//_________________________________________________________
router.post('/category', adminMiddleware, categoryCreateValidator, er(create))

router.get('/categories', er(list))
router.get('/category/:slug', er(read))
router.delete('/category/:slug', adminMiddleware, er(remove))

module.exports = router
