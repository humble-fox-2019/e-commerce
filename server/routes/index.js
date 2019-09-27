const express = require('express')
const router = express.Router()

const user = require('./user')
const product = require('./product')
const cart = require('./cart')
const authentication = require('../middlewares/authentication')


router.use('/', user)
router.use('/product',product)
router.use('/cart',cart)
//router.use(authentication)
module.exports = router