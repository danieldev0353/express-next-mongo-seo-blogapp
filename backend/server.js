const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// _______________________ config _______________________
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: `${process.env.CLIENT_URL}` }))

// _______________________ routes _______________________
app.use('/api', require('./routes/blog'))
app.use('/api', require('./routes/auth'))

// _______________________ start ________________________
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    const port = process.env.PORT || 8000
    app.listen(port, () => {
      console.log(`Server started on ${port}`)
    })
  })

app.use(function (err, req, res, next) {
  res.status(500).json({
    error: err.message,
  })
})
