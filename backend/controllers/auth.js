const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const _ = require('lodash')

exports.signup = async (req, res) => {
  const { name, email, password } = req.body
  let user = await User.findOne({ email })
  if (user) {
    return res.fail('Email is taken')
  }

  let username = shortId.generate()
  let profile = `${process.env.CLIENT_URL}/profile/${username}`
  let newUser = new User({ name, email, password, profile, username })
  await newUser.save()

  res.ok('Signup success')
}

exports.signin = async (req, res) => {
  let { email, password } = req.body
  let user = await User.findOne({ email })
  if (!user) {
    return res.fail('User with that email does not exist')
  }

  if (!user.isAuthenticate(password)) {
    return res.fail('Email and password do not match')
  }

  let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  })

  {
    let { _id, username, name, email, role } = user
    res.ok('Signin success', {
      token,
      user: { _id, username, name, email, role },
    })
  }
}

exports.signout = (req, res) => {
  res.ok('Signout success')
}

exports.forgotPassword = async (req, res) => {
  let { email } = req.body
  let user = await User.findOne({ email })
  if (!user) {
    return res.fail('User not found')
  }

  let token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
    expiresIn: '30m',
  })
  let link = `${process.env.CLIENT_URL}/auth/reset/${token}`

  let mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password reset link',
    html: `
    <p>Please use the following link to reset your password:</p>
    <p>${link}</p>
    <hr />
    <p>This email may contain sensetive information</p>`,
  }

  let transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transport.sendMail(mailOptions)
  await user.updateOne({ resetPasswordToken: token })

  res.ok('ForgotPasswordLink sent by email')
}

exports.resetPassword = async (req, res) => {
  let { resetPasswordToken, newPassword } = req.body

  let result = jwt.verify(resetPasswordToken, process.env.JWT_RESET_PASSWORD)
  let user = await User.findOne({ _id: result._id })

  user.password = newPassword
  await user.save()

  res.ok('NewPassword saved')
}
