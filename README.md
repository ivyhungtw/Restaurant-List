# My Restaurant List

A simple web application built with Express.js for users to manage their restaurant lists.

This project is Live on: https://enigmatic-journey-42544.herokuapp.com/

## Features

- Register, login and logout an account
- Facebook login
- View all restaurants
- Search restaurants by name and category
- Sort restaurants by name, category, or rating.
- View the information of a restaurant, including rating, category, address, phone number, image, and Google Map.
- Add a restaurant
- Edit a restaurant
- Delete a restaurant

![Login page](/public/photos/login.png)
![Register page](/public/photos/register.png)
![Home page](/public/photos/index.png)
![Restaurant page](/public/photos/detail.png)

## Prerequisites & Packages

- Node.js v14.15.1
- Express
- Express-handlebars
- mongoDB Community Server
- mongoose
- bcryptjs
- connect-flash
- dotenv
- express-session
- method-override
- passport
- passport-facebook
- passport-local

## Installation

#### Clone the source locally

```
$ git clone https://github.com/ivyhungtw/Restaurant-List.git
$ cd Restaurant-List
```

#### Install project dependencies

```
npm install
```

#### Import seed data

```
npm run seed
```

#### Start the app

```
npm run dev
```

The server will start running on

- http://localhost:3000/
