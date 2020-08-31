const express = require('express')
const router = express.Router()
const rescue = require('express-rescue')
const { create } = require('../controllers/category')

//_________________________________________________________
const { categoryCreateValidator } = require('../validators/category')
const { requireSignin, adminMiddleware } = require('../middlewares/auth')

//_________________________________________________________
router.post(
  '/category',
  requireSignin,
  rescue(adminMiddleware),
  categoryCreateValidator,
  rescue(create)
)

module.exports = router
