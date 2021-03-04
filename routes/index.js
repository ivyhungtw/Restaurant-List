// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

// Direct to modules
router.use('/', home)
router.use('/restaurants', restaurants)

// Export
module.exports = router
