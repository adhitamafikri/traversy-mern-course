const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

const apiRoutes = require('./routes/api')
const config = require('./config')

const app = express()

// Middlewares
app.use(bodyParser.json())

// Connect DB
mongoose
  .connect(config.MONGODB_ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to DB'))
  .catch((err) => console.log(err)
)

// Use Routes
app.use('/traversy-mern/v1', apiRoutes)

// Listen
const PORT = process.env.APP_PORT || 4009
app.listen(PORT, function() {
  console.log('running on PORT ', PORT)
})
