// Require related packages
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const User = require('../user')

// Variables
const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678',
  },
  {
    email: 'user2@example.com',
    password: '12345678',
  },
]

// Success
db.once('open', () => {
  // hash the password for seed users
  // this will return a list of 2 hashed passwords
  return Promise.all(
    SEED_USERS.map(user => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => (user.password = hash))
    })
  ).then(() => {
    // save seed users to User model
    User.insertMany(SEED_USERS).then(users => {
      // create restaurants owned by seed users
      // this will return a list of 6 restaurants with userId
      return Promise.all(
        Array.from({ length: 6 }, (_, index) => {
          const restaurant = restaurantList[index]
          // restaurants of index 0~2 owned by users[0]
          if (0 <= index && index <= 2) {
            restaurant['userId'] = users[0]._id
            return Restaurant.create(restaurant)
          }
          // restaurants of index 3~5 owned by users[1]
          if (3 <= index && index <= 5) {
            restaurant['userId'] = users[1]._id
            return Restaurant.create(restaurant)
          }
        })
      ).then(() => {
        console.log('done')
        process.exit()
      })
    })
  })
})
