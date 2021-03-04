// Require Express and Express router
const express = require('express')
const router = express.Router()

// Define routes
router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

// Export router
module.exports = router
