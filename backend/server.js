const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

//_________________________________________________________
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(require('./middlewares/responses'))
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//_________________________________________________________
app.use('/api', require('./routes/blog'))
app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/user'))
app.use('/api', require('./routes/category'))

//_________________________________________________________
const port = process.env.PORT || 8000
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server started on ${port}`))
  })

app.use(function (err, req, res, next) {
  res.status(500).json({
    error: err.message,
  })
})
