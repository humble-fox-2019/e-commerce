const Product = require('../models/Product')

class ProductController {

    static create(req, res, next) {
        const { name, description, price, stock } = req.body
        let image = null
        if(req.file) {
            image = req.file.cloudStoragePublicUrl
        }else{
            image = null
        }
        Product.create({
            name,
            description,
            image,
            price,
            stock,
            store: req.decode.id
        })
            .then(product => {
                res.status(201).json({
                    message: 'Success add product'
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

    static getMyProduct(req, res, next) {
        Product.find({
            store: req.decode.id
        })
        .then(products => {
            res.json({
                products
            })
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





