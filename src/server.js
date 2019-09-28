const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')
const config = require('./config')
const app = express()

// Middlewares
app.use(bodyParser.json())

// Connect DB
mongoose.connect(
  config.MONGODB_ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function() {
    console.log('connected to DB')
  }
)

app.listen('4009', function() {
  console.log('running on PORT 4009')
})
