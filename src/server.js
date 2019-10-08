const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
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

// Serve static assets in Prod
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Listen
const PORT = process.env.APP_PORT || 4009
app.listen(PORT, function() {
  console.log('running on PORT ', PORT)
})
