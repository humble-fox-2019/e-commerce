const router = require('express').Router()
const userRoutes = require('./userRoutes')
const storeRoutes = require('./storeRoutes')
const productRoutes = require('./productRoutes')
const cartRoutes = require('./cartRoutes')
const transactionRoutes = require('./transactionRoutes')

router.get('/', (req, res, next) => {
    res.json('Hello world')
})

router.use('/user', userRoutes)
router.use('/store', storeRoutes)
router.use('/product', productRoutes)
router.use('/cart', cartRoutes)
router.use('/transaction', transactionRoutes)

module.exports = router


