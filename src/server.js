const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const config = require('./config')

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.listen('4009', function() {
  console.log('running on PORT 4009', config.MONGODB_ATLAS_URL)
})
