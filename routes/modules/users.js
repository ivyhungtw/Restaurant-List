// Require Express and Express router
const express = require('express')
const router = express.Router()

// Define routes
router.get('/login', (req, res) => {
  res.render('login')
})

// Export router
module.exports = router
