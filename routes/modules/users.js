// Require Express and Express router
const express = require('express')
const router = express.Router()

const passport = require('passport')

// Require User model
const User = require('../../models/user')

// Define routes
router.get('/login', (req, res) => {
  res.render('login', { error_msg: req.flash('error') })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const errors = []
  // Get form data
  const { name, email, password, confirmPassword } = req.body
  // Check if user already exists
  User.findOne({ email }).then(user => {
    // If user exists, push error msg
    if (user) {
      errors.push({ message: 'The email has been used.' })
    }
    // If password and confirmPassword are not the same, push error msg
    if (password !== confirmPassword) {
      errors.push({ message: 'Password and confirmPassword do not match.' })
    }
    // If the length of errors > 0, return to register page
    if (errors.length > 0) {
      return res.render('register', {
        errors,
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
      .then(() => {
        req.flash('success_msg', 'Register successfully! Please login.')
        res.redirect('/users/login')
      })
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'logout successfully!')
  res.redirect('/users/login')
})

// Export router
module.exports = router
