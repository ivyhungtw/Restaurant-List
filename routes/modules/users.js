// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require User model
const User = require('../../models/user')

// Define routes
router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // Get form data
  const { name, email, password, confirmPassword } = req.body
  // Check if user already exists
  User.findOne({ email }).then(user => {
    // If user exists, return to register page
    if (user) {
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword,
      })
    }

    // If not, create and save a user to model
    // then redirect to login page
    return User.create({
      name,
      email,
      password,
    })
      .then(() => res.redirect('/users/login'))
      .catch(err => console.log(err))
  })
})

// Export router
module.exports = router
