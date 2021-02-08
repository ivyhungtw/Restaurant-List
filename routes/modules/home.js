// Require related packages
const express = require('express')
const router = express.Router()
const { v1: uuidv1 } = require('uuid')

const Restaurant = require('../../models/restaurant')
const users = require('../../users.json').results
const getUserId = require('../../public/javascripts/getUserId')

// Define variables
let sessions = {}
let userId
let userInfo = {}

// Get user info
router.use(function (req, res, next) {
  if (req.headers.cookie) {
    userId = getUserId(req, res)
  }
  userInfo = sessions[userId] || {}
  next()
})

// Set up routes of home page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants, name: userInfo.name })
    })
    .catch(error => console.log(error))
})

router.get('/login', (req, res) => {
  if (userInfo.name) {
    res.render('welcome', { name: userInfo.name })
  } else {
    // Clear the cookies in case the session userId is not valid
    if (userId) res.clearCookie('userId')
    res.render('login')
  }
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

  if (user) {
    // Generate an unique user id
    userId = uuidv1()
    // Set up sessions
    sessions[userId] = {
      id: user._id,
      name: user.firstName,
    }
    // Send cookies
    res.cookie('userId', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
    })

    res.render('welcome', { name: user.firstName })
  } else {
    res.render('login', {
      errorMsg: 'Incorrect username or password',
      email,
      password,
    })
  }
})

// Export
module.exports = { router, sessions }
