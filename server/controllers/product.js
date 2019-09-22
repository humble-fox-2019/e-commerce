const Product = require('../models/product')

class productController {
    static store(req, res, next) {
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
    }
}

module.exports = productController