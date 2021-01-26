// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require Restaurant model
const Restaurant = require('../../models/restaurant')

// Set up routes of home page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({
    $or: [
      { name: new RegExp(keyword, 'i') },
      { category: new RegExp(keyword, 'i') },
    ],
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// Export
module.exports = router
