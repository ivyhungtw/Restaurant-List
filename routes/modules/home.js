// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require Restaurant model
const Restaurant = require('../../models/restaurant')

// Set up routes of home page
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// Export
module.exports = router
