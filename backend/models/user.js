const mongoose = require('mongoose')
const cryptoJS = require('crypto-js')

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
      default: 0,
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
  { timestamps: true }
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
      return cryptoJS.HmacSHA1(password, salt).toString()
    } catch (err) {
      console.log(err)
      return ''
    }
  },
}

module.exports = mongoose.model('User', userSchema)
