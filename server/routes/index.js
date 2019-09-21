const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')

router.get('/', (req, res) => res.send('Hello world!'))
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)

module.exports = router