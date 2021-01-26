// Require related packages
const mongoose = require('mongoose')
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

// Success
db.once('open', () => {
  restaurantList.forEach(restaurant => Restaurant.create(restaurant))
  console.log('done')
})
