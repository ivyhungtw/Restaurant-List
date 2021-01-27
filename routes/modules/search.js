// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require Restaurant model
const Restaurant = require('../../models/restaurant')

// Set up routes
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({
    $or: [
      { name: new RegExp(keyword.trim(), 'i') },
      { category: new RegExp(keyword.trim(), 'i') },
    ],
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})

// Export
module.exports = router
