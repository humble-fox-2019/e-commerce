const express = require('express')
const router = express.Router()
const user = require('../routes/user')
const Cart = require('../routes/cart')
const Product = require('../routes/product')
const transaction = require('../routes/transaction')

router.use('/user', user)
router.use('/cart', Cart)
router.use('/product', Product)
router.use('/transaction', transaction)

module.exports = router