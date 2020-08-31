const expressJwt = require('express-jwt')
const User = require('../models/user')

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
})

exports.authMiddleware = (req, res, next) => {
  User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.fail('User not found')
    }

    req.profile = user
    next()
  })
}

exports.adminMiddleware = (req, res, next) => {
  User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.fail('User not found')
    }

    if (user.role !== 1) {
      return res.fail('Admin resource. Access denied')
    }

    req.profile = user
    next()
  })
}
