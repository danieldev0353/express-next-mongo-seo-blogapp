const formidable = require('formidable')
const stripHtml = require('string-strip-html')
const _ = require('lodash')
const slugify = require('slugify')
const fs = require('fs')
const Blog = require('../models/blog')

exports.create = async (req, res) => {
  const form = formidable({ multiples: true })

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.fail(err)
    }

    const { title, body, categories, tags } = fields
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

    if (files.photo) {
      blog.photo.data = fs.readFileSync(files.photo.path)
      blog.photo.contentType = files.photo.type
    }

    let arrayOfCategories = categories && categories.split(',')
    let arrayOfTags = tags && tags.split(',')
    blog.tags.push(arrayOfTags)
    blog.categories.push(arrayOfCategories)

    blog.save((err, result) => {
      if (err) {
        return res.fail(err?.message)
      }

      res.ok('Saved', result)
    })
  })
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

exports.listAll = async (req, res) => {}
exports.read = async (req, res) => {}
exports.remove = async (req, res) => {}
exports.update = async (req, res) => {}
