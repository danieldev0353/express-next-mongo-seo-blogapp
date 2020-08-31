const Category = require('../models/category')
const slugify = require('slugify')

exports.create = async (req, res) => {
  let { name } = req.body
  let slug = slugify(name).toLowerCase()

  let category = new Category({ name, slug })
  let result = await category.save()

  res.ok('Category saved', result)
}

exports.list = async (req, res) => {
  let categories = await Category.find({})
  res.ok('Categories', categories)
}

exports.read = async (req, res) => {
  let slug = req.params.slug.toLowerCase()
  let category = await Category.findOne({ slug })

  res.ok('Category', category)
}

exports.remove = async (req, res) => {
  const slug = req.params.slug.toLowerCase()
  await Category.findOneAndRemove({ slug })

  res.ok('Category deleted successfully')
}
