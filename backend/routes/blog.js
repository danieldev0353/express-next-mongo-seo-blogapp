const express = require('express')
const router = express.Router()
const er = require('express-rescue')
const {
  create,
  list,
  listAll,
  read,
  remove,
  update,
  photo,
  listRelated,
  listSearch,
} = require('../controllers/blog')

//_________________________________________________________
const { adminMiddleware } = require('../middlewares/auth')

//_________________________________________________________
router.post('/blog', adminMiddleware, er(create))
router.get('/blogs', er(list))
router.get('/blogs-categories-tags', er(listAll))

router.get('/blog/:slug', er(read))
router.delete('/blog/:slug', adminMiddleware, er(remove))
router.put('/blog/:slug', adminMiddleware, er(update))
router.get('/blog/photo/:slug', er(photo))
router.post('/blogs/related', er(listRelated))
router.get('/blogs/search', er(listSearch))

module.exports = router
