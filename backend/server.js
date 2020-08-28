const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { get } = require('mongoose')
require('dotenv').config()

// _______________________ app _______________________
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
if (process.env.NODE_ENV == 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

// _______________________ routes _______________________
app.get('/api', (req, res) => {
  res.json({ time: Date().toString() })
})

// ______________________________________________________
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server started on ${port}`)
})
