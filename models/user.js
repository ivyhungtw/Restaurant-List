// Require mongoose and load Schema function
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define Schema
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Export User model
module.exports = mongoose.model('User', userSchema)
