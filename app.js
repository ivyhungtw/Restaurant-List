// Require related packages and defined server-related variables
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

const port = 3000
const app = express()

// Set up template engine
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: {
      eq: function (a, b) {
        return a === b
      },
    },
  })
)
app.set('view engine', 'handlebars')

// Handle session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

// Set up body parse
app.use(express.urlencoded({ extended: true }))

// Set up static files
app.use(express.static('public'))

// Set up method-override
app.use(methodOverride('_method'))

// Call passport function
usePassport(app)

// Direct request to routes/index.js
app.use(routes)

// Start and listener on the Express server
app.listen(port, () => {
  console.log('Listening')
})
