const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 3,
      max: 160,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    mdesc: {
      type: String,
    },
    body: {
      type: {},
      required: true,
      min: 200,
      max: 2000000,
      trim: true,
    },
    excerpt: {
      type: String,
      max: 1000,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    categories: [{ type: ObjectId, ref: 'Category', required: true }],
    tags: [{ type: ObjectId, ref: 'Tag', required: true }],
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamp: true }
)

blogSchema.methods = {
  smartTrim: function (str, length, delim, appendix) {
    if (str.length <= length) return str
    var trimmedStr = str.substr(0, length + delim.length)

    var lastDelimIndex = trimmedStr.lastIndexOf(delim)
    if (lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex)

    if (trimmedStr) trimmedStr += appendix
    return trimmedStr
  },
}

module.exports = mongoose.model('Blog', blogSchema)
