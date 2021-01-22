// Include Express form node_modules and defined server-related variables
const express = require('express')
const app = express()
const port = 3000

// Require packages used in the project
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')

// Connect to database
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// Get connection status
const db = mongoose.connection
// Error
db.on('error', () => console.log('mogodb error!'))
// Success
db.once('open', () => console.log('mogodb connected!'))

// Set up template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set up static files
app.use(express.static('public'))

// Set up the routes and corresponding response
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(
    restaurant =>
      restaurant.name.includes(keyword) || restaurant.category.includes(keyword)
  )
  res.render('index', { restaurants: restaurants })
})

// Start and listener on the Express server
app.listen(port, () => {
  console.log('Listening')
})
