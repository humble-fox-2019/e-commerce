const router = require('express').Router()
const userRoutes = require('./userRoutes')
const storeRoutes = require('./storeRoutes')
const productRoutes = require('./productRoutes')

const authentication = require('../middleware/userAuthentication.js')

router.get('/', (req, res, next) => {
    res.json('Hello world')
})

router.use('/user', userRoutes)
router.use('/store', storeRoutes)
router.use('/product', productRoutes)

module.exports = router


