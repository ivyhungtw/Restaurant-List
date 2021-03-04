// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require Restaurant model
const Restaurant = require('../../models/restaurant')
const users = require('../../users.json').results
const getUserId = require('../../public/javascripts/getUserId')

// Define variables
let sessions = {}
let userId
let userInfo = {}

// Require data
const users = require('../../users.json').results

// Set up routes of home page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/logout', (req, res) => {
  res.clearCookie('userId')
  sessions = {}
  res.redirect('/login')
})

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = users.find(
    user => (user.email === email) & (user.password === password)
  )

  user
    ? res.render('welcome', { name: user.firstName })
    : res.render('login', {
        errorMsg: 'Incorrect username or password',
        email,
        password,
      })
})

// Export
module.exports = router
