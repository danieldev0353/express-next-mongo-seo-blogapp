const Category = require('../models/category')
const slugify = require('slugify')

exports.create = async (req, res) => {
  const { name } = req.body
  let slug = slugify(name).toLowerCase()

  let category = new Category({ name, slug })

  let result = await category.save()
  res.ok('Category saved', result)
}
