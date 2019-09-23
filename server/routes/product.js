const express = require('express')
const Products = require('../models/product')
const productController = require('../controllers/product')
const router = express.Router()

router.post('/products', (req, res, next) => {
    const {
        name,
        size,
        color,
        stock
    } = req.body

    Products.create({
        name,
        size,
        color,
        stock
    })
        .then(product => {
            res.status(201).json(product)
        })
        .catch(err => {
            res.status(400).json({
                message: `invalid input`
            })
        })
})

router.get('/products', (req, res, nex) => {
    Products.find()
        .then(products => {
            res.status(200).json(products)
        }).catch(err => {
            res.status(500).json({
                message: 'INTERNAL SERVICE ERROR'
            })
        })

})


module.exports = router