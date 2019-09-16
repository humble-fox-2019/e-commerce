const Product = require('../models/Product')

class ProductController {

    static create(req, res, next) {
        const { name, description, price, quantity } = req.body
        Product.create({
            name,
            description,
            image: req.file.cloudStoragePublicUrl,
            price,
            quantity,
            store: req.decode.id
        })
            .then(product => {
                res.json({
                    product
                })
            })
            .catch(next)
    }

    static getAll(req, res, next) {
        Product.find({})
            .then(products => {
                res.json({
                    products
                })
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        Product.findById(req.params.id)
            .then(product => {
                if(product) {
                    res.json({
                        product
                    })
                }else {
                    res.status(404).json({
                        message: 'product not found'
                    })
                }
            })
            .catch(next)
    }

    static filterProduct(req, res, next) {
        
    }

    static deleteProduct(req, res, next) {

    }

    static updateProduct(req, res, next) {

    }

    


}


module.exports = ProductController





