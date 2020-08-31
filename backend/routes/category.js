const express = require('express')
const router = express.Router()
const rescue = require('express-rescue')
const { create, list, read, remove } = require('../controllers/category')

//_________________________________________________________
const { categoryCreateValidator } = require('../validators/category')
const { requireSignin, adminMiddleware } = require('../middlewares/auth')

//_________________________________________________________
router.post(
  '/category',
  requireSignin,
  adminMiddleware,
  categoryCreateValidator,
  rescue(create)
)

router.get('/categories', rescue(list))
router.get('/category/:slug', rescue(read))
router.delete('/category/:slug', requireSignin, adminMiddleware, rescue(remove))

module.exports = router
