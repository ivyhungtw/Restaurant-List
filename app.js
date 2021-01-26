// Require related packages and defined server-related variables
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const port = 3000
const app = express()

// Set up template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set up body parse
app.use(express.urlencoded({ extended: true }))

// Set up static files
app.use(express.static('public'))

// Set up method-override
app.use(methodOverride('_method'))

// Direct request to routes/index.js
app.use(routes)

// Start and listener on the Express server
app.listen(port, () => {
  console.log('Listening')
})
