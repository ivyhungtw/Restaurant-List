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
db.once('open', async () => {
  await new Promise(function (resolve) {
    SEED_USERS.forEach((seedUser, index) => {
      // hash the password for seed users
      // this will return a user model
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash =>
          User.create({
            email: seedUser.email,
            password: hash,
          })
        )
        .then(user => {
          const userId = user._id
          // create restaurants owned by the user
          // this will return a list of 3 restaurants with userId
          return Promise.all(
            Array.from({ length: 3 }, (_, i) => {
              const restaurant = restaurantList[i + index * 3]
              restaurant['userId'] = userId
              return Restaurant.create(restaurant)
            })
          )
        })
        .then(() => {
          console.log('done')
          if (index === SEED_USERS.length - 1) resolve()
        })
        .catch(err => console.log(err))
    })
  })
  process.exit()
})
