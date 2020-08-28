exports.signup = (req, res) => {
  throw new Error('test error')
  const { name, email, password } = req.body
  res.json({
    user: { name, email, password },
  })
}
