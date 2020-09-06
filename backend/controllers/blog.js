const formidable = require('formidable')
const stripHtml = require('string-strip-html')
const _ = require('lodash')
const slugify = require('slugify')
const fs = require('fs')

const Blog = require('../models/blog')
const Category = require('../models/category')
const Tag = require('../models/tag')

exports.create = async (req, res) => {
  const { title, body, categories, tags } = req.body
  if (!title || !body || !categories || !tags) {
    return res.fail('Not all fields are specified')
  }

  let blog = new Blog()
  blog.title = title
  blog.body = body
  blog.mdesc = stripHtml(body).result.substring(0, 160)
  blog.excerpt = blog.smartTrim(body, 320, ' ', ' ...')
  blog.slug = slugify(title).toLowerCase()
  blog.postedBy = req.user._id

  if (req.files?.photo) {
    if (req.files.photo.size > 10000000) {
      res.fail('Image should be less then 1mb in size')
    }

    blog.photo.data = req.files.photo.data
    blog.photo.contentType = req.files.photo.mimetype
  }

  let arrayOfCategories = categories && categories.split(',')
  let arrayOfTags = tags && tags.split(',')
  blog.tags.push(arrayOfTags)
  blog.categories.push(arrayOfCategories)

  let saved = await blog.save()
  res.ok('Saved', saved)
}

exports.list = async (req, res) => {
  let blogs = await Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select(
      '_id title slug excerpt categories tags postedBy createdAt updatedAt'
    )

  res.ok('Blogs', blogs)
}

exports.listAll = async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10
  let skip = req.query.skip ? parseInt(req.query.skip) : 0

  let blogs = Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username profile')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      '_id title slug excerpt categories tags postedBy createdAt updatedAt'
    )

  let categories = Category.find({})
  let tags = Tag.find({})

  Promise.all([blogs, categories, tags])
    .then(([blogs, categories, tags]) => {
      res.ok('all', { blogs, categories, tags })
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

exports.read = async (req, res) => {
  let slug = req.params.slug.toLowerCase()

  let blog = await Blog.findOne({ slug })
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select('-photo')

  res.ok('Blog', blog)
}

exports.remove = async (req, res) => {
  let slug = req.params.slug.toLowerCase()
  await Blog.findOneAndRemove({ slug })
  res.ok('Removed')
}

exports.update = async (req, res) => {
  let slug = req.params.slug.toLowerCase()
  let oldBlog = await Blog.findOne({ slug })

  let slugBeforeMerge = oldBlog.slug
  oldBlog = _.merge(oldBlog, req.body)
  oldBlog.slug = slugBeforeMerge

  const { body, desc, categories, tags } = req.body

  if (body) {
    oldBlog.mdesc = stripHtml(body).result.substring(0, 160)
    oldBlog.excerpt = oldBlog.smartTrim(body, 320, ' ', ' ...')
  }

  if (categories) {
    oldBlog.categories = categories.split(',')
  }

  if (tags) {
    oldBlog.tags = tags.split(',')
  }

  if (req.files?.photo) {
    if (req.files.photo.size > 10000000) {
      return res.fail('Image should be less then 1mb in size')
    }

    oldBlog.photo.data = req.files.photo.data
    oldBlog.photo.contentType = req.files.photo.mimetype
  }

  let saved = await oldBlog.save()
  res.ok('Saved', saved)
}

exports.photo = async (req, res) => {
  const slug = req.params.slug.toLowerCase()
  let blog = await Blog.findOne({ slug }).select('photo')

  res.set('Content-Type', blog.photo.contentType)
  return res.send(blog.photo.data)
}

exports.listRelated = async (req, res) => {
  console.log(req.body)

  let limit = req.body.limit ? parseInt(req.body.limit) : 3
  const { _id, categories } = req.body

  let blogs = await Blog.find({
    _id: { $ne: _id },
    categories: { $in: categories },
  })
    .limit(limit)
    .populate('postedBy', '_id name profile')
    .select('title slug excerpt postedBy createdAt updatedAt')

  res.ok('Related blogs', blogs)
}
