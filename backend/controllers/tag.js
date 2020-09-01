const Tag = require('../models/tag')
const slugify = require('slugify')

exports.create = async (req, res) => {
  const { name } = req.body
  let slug = slugify(name).toLowerCase()

  let tag = new Tag({ name, slug })
  let result = await tag.save()

  res.ok('Created', result)
}

exports.list = async (req, res) => {
  let tags = await Tag.find({})
  res.ok('Tags', tags)
}

exports.read = async (req, res) => {
  const slug = req.params.slug.toLowerCase()
  let tag = await Tag.findOne({ slug })

  res.ok('Tag', tag)
}

exports.remove = async (req, res) => {
  const slug = req.params.slug.toLowerCase()
  await Tag.findOneAndRemove({ slug })

  res.ok('Removed')
}
