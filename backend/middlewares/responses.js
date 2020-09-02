module.exports = function (req, res, next) {
  res.ok = function (message, data) {
    res.json({
      message,
      data,
    })
  }

  res.fail = function (error) {
    res.status(400).json({
      error: error.message ? error.message : error,
    })
  }

  next()
}
