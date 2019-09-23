const express = require('express')
const userRoute = require ('./user')
const productRoute = require ('./product')
const shoppingCartRoute = require ('./shoppingCart')
const router = express.Router() 

router.use( '/user', userRoute )
router.use( '/product', productRoute)
router.use('/cart', shoppingCartRoute)


module.exports = router