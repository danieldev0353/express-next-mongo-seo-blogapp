const User = require('../models/user')

exports.signup = async (req, res) => {
  const { name, email, password } = req.body

  let user = await User.findOne2({ email: email })
  if (user) {
    res.fail('Email is taken')
  }

  res.ok(user)
}
