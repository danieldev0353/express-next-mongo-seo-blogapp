const User = require('../models/user')
const Blog = require('../models/blog')

exports.read = (req, res) => {
  return res.json(req.profile)
}

exports.publicProfile = async (req, res) => {
  let username = req.params.username

  let user = await User.findOne({ username })
  let blogs = await Blog.find({ postedBy: user._id })
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name')
    .limit(10)
    .select(
      '_id title slug excerpt categories tags postedBy createdAt updatedAt'
    )

  res.json({
    user,
    blogs,
  })
}
