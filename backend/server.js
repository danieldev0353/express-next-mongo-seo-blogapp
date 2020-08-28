const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// _______________________ config _______________________

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
if (process.env.NODE_ENV == 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

// _______________________ routes _______________________
const blogRoutes = require('./routes/blog')
app.use('/api', blogRoutes)

// ______________________________________________________

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
