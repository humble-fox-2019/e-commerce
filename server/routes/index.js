'use strict'

const express = require('express')
const userRouter = require('./user')
const productRouter = require('./product')
const { authentication } = require('../middlewares/authentication')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({ page: 'Home', message: 'Connected to E-commerce Apps!' })
})

// Routing
router.use('/users', userRouter)
router.use(authentication)
router.use('/products', productRouter)

module.exports = router
