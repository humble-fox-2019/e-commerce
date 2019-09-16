const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')

router.get('/', (req, res) => res.send('Hello world!'))
router.use('/users', userRouter)
router.use('/products', productRouter)

module.exports = router