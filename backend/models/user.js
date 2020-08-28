const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    profile: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  { timestamp: true }
)

userSchema.virtual('password').set(function (password) {
  this.hashed_password = this.encryptPassword(password)
})

userSchema.methods = {
  isAuthenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  encryptPassword: function (password) {
    if (!password) return ''
    try {
      const salt = process.env.SALT
      return crypto.createHmac('sha1', salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },
}

module.exports = mongoose.model('User', userSchema)
