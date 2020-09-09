const Category = require('../models/category')
const Blog = require('../models/blog')
const slugify = require('slugify')

exports.create = async (req, res) => {
  let { name } = req.body
  let slug = slugify(name).toLowerCase()

  let category = new Category({ name, slug })
  let result = await category.save()

  res.ok('Created', result)
}

exports.list = async (req, res) => {
  let categories = await Category.find({})
  res.ok('Categories', categories)
}

exports.read = async (req, res) => {
  let slug = req.params.slug.toLowerCase()
  let category = await Category.findOne({ slug })

  let blogs = await Blog.find({ categories: category._id })
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name')
    .select(
      '_id title slug excerpt categories postedBy tags createdAt updatedAt'
    )

  res.ok('Category', { category: category, blogs: blogs })
}

exports.remove = async (req, res) => {
  const slug = req.params.slug.toLowerCase()
  await Category.findOneAndRemove({ slug })

  res.ok('Removed')
}
