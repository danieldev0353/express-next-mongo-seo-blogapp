const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  const { name, email, password } = req.body
  let user = await User.findOne({ email })
  if (user) {
    return res.fail('Email is taken')
  }

  let username = shortId.generate()
  let profile = `${process.env.CLIENT_URL}/profile/${username}`
  let newUser = new User({ name, email, password, profile, username })
  await newUser.save()

  res.ok('Signup success! Please signin')
}

exports.signin = async (req, res) => {
  let { email, password } = req.body
  let user = await User.findOne({ email })
  if (!user) {
    return res.fail('User with that email does not exist. Please signup')
  }

  if (!user.isAuthenticate(password)) {
    return res.fail('Email and password do not match')
  }

  let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  })

  {
    let { _id, username, name, email, role } = user
    res.ok('Signin', { token, user: { _id, username, name, email, role } })
  }
}

exports.signout = (req, res) => {
  res.ok('Signout success')
}
