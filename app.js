// Include Express form node_modules and defined server-related variables
const express = require('express')
const app = express()
const port = 3000

// Require packages used in the project
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// Set up template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set up static files
app.use(express.static('public'))

// Set up the routes and corresponding response
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// Start and listener on the Express server
app.listen(port, () => {
  console.log('Listening')
})
