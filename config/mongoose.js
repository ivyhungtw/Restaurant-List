// Require mongoose
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI

// Connect to database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

// Get connection status
const db = mongoose.connection
// Error
db.on('error', () => console.log('mogodb error!'))
// Success
db.once('open', () => console.log('mogodb connected!'))

// Export db
module.exports = db
