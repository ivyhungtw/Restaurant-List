// Require Express and Express router
const express = require('express')
const router = express.Router()

// Require Restaurant model
const Restaurant = require('../../models/restaurant')

// Set up routes
router.get('/new', (req, res) => {
  res.render('new')
})

router.get('', (req, res) => {
  const keyword = req.query.keyword
  const sort = req.query.sort
  Restaurant.find({
    $or: [
      { name: new RegExp(keyword.trim(), 'i') },
      { category: new RegExp(keyword.trim(), 'i') },
    ],
  })
    .lean()
    .sort(sort)
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})

router.post('', (req, res) => {
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body
  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating: parseFloat(rating),
    description,
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = parseFloat(rating)
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Export
module.exports = router
