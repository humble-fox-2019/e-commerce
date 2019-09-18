const router = require('express').Router();
const product = require('./productRouter')
const user = require('./userRouter')

router.use('/users', user)
router.use('/products', product)

module.exports = router