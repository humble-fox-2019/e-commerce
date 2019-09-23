const express = require('express')
const userRoute = require ('./user')
const productRoute = require ('./product')
const router = express.Router() 

router.use( '/user', userRoute )
router.use( '/product', productRoute)


module.exports = router