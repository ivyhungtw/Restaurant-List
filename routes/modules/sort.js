// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require Restaurant model
const Restaurant = require('../../models/restaurant')

// Set up routes
router.get('/', (req, res) => {
  console.log('req.query', req.query)
  const method = req.query.method
  Restaurant.find()
    .lean()
    .sort(method)
    .then(restaurants => res.render('index', { restaurants, method }))
    .catch(error => console.log(error))
})

// Export
module.exports = router
