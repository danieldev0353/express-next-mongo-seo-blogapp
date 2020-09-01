const expressJwt = require('express-jwt')
const User = require('../models/user')

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
})

exports.authMiddleware = [
  requireSignin,
  (req, res, next) => {
    User.findById({ _id: req.user._id })
      .select('-hashed_password')
      .exec((err, user) => {
        if (err || !user) {
          return res.fail('User not found')
        }

        req.profile = user
        next()
      })
  },
]

exports.adminMiddleware = [
  requireSignin,
  (req, res, next) => {
    User.findById({ _id: req.user._id })
      .select('-hashed_password')
      .exec((err, user) => {
        if (err || !user) {
          return res.fail('User not found')
        }

        if (user.role !== 1) {
          return res.fail('Admin resource. Access denied')
        }

        req.profile = user
        next()
      })
  },
]
