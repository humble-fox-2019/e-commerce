const Router = require('express').Router();
const users = require('./users')
const products = require('./products')
const carts = require('./carts')

// * Server Test
Router.get('/', (req, res) => {
    res.status(200).json({ message: "connected to server" })
})

// * Routes

Router.use('/users', users)
Router.use('/products', products)
Router.use('/carts', carts)

module.exports = Router;