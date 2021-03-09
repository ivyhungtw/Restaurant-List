// Require related packages
const mongoose = require('mongoose')

// Create variables
const Schema = mongoose.Schema

// Define schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  name_en: String,
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: String,
  google_map: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
})

// Export
module.exports = mongoose.model('Restaurant', restaurantSchema)
