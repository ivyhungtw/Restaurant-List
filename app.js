// Include Express form node_modules and defined server-related variables
const express = require('express')
const app = express()
const port = 3000

// Require packages used in the project
const exphbs = require('express-handlebars')

// Set up template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set up the routes and corresponding response
app.get('/', (req, res) => {
  res.render('index')
})

// Start and listener on the Express server
app.listen(port, () => {
  console.log('Listening')
})
