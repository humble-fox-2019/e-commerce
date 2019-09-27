const router = require('express').Router();
const product = require('./productRouter')
const user = require('./userRouter')
const cart = require('./cartRouter.js')

router.use('/users', user)
router.use('/products', product)
router.use('/carts', cart)

module.exports = router