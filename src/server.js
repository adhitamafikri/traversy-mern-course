const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.listen('4009', function() {
  console.log('running on PORT 4009', process.env.APP_ENV)
})
