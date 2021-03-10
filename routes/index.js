// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')

// Require middleware
const { authenticator } = require('../middleware/auth')

// Direct to modules
router.use('/users', users)
router.use('/restaurants', authenticator, restaurants)
router.use('/auth', auth)
router.use('/', authenticator, home)

// Export
module.exports = router
