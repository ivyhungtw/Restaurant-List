// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')

// Direct to modules
router.use('/users', users)
router.use('/restaurants', restaurants)
router.use('/', home)

// Export
module.exports = router
