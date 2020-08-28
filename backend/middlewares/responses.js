module.exports = function (req, res, next) {
  res.ok = function (message, data) {
    res.json({
      message,
      data,
    })
  }

  res.fail = function (message) {
    res.status(400).json({
      error: message,
    })
  }

  next()
}
