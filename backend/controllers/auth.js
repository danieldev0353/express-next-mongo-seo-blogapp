const User = require('../models/user')
const shortId = require('shortid')

exports.signup = async (req, res) => {
  const { name, email, password } = req.body
  let user = await User.findOne({ email })
  if (user) {
    res.fail('Email is taken')
  }

  let username = shortId.generate()
  let profile = `${process.env.CLIENT_URL}/profile/${username}`
  let newUser = new User({ name, email, password, profile, username })
  await newUser.save()

  res.ok('Signup success! Please signin')
}
