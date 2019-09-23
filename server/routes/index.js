const express = require('express');
const router = express.Router();
const product_routes = require('./product_routes')
const user_routes = require('./user_routes')
const cart_routes = require('./cart_routes')
const transaction_routes = require('./transaction_routes')
const voucher_routes = require('./voucher_routes')

router.get('/' , (req,res)=>{
    res.json({
        message : 'Welcome !!!!'
    })
})

router.use('/product' , product_routes )
router.use('/user' , user_routes)
router.use('/cart' , cart_routes)
router.use('/transaction' , transaction_routes)
router.use('/voucher' , voucher_routes)

module.exports = router
