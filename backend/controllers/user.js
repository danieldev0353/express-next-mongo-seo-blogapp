const User = require('../models/user')

exports.read = (req, res) => {
  return res.json(req.profile)
}
