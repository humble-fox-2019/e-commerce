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
            .populate('store', 'name city province')
            .then(products => {
                res.json({
                    products
                })
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        Product.findById(req.params.id)
            .populate('store', 'name province city')
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

    static getFeatured(req, res, next) {
        Product
        .find()
        .limit(4)
        .populate('store', 'name city province')
        .then(products => {
            res.json({ products })
        })
    }

    static filterProduct(req, res, next) {
        
    }

    static deleteProduct(req, res, next) {
        Product.findByIdAndDelete(req.params.id)
            .then(data => {
                res.json({
                    message: 'Success delete data'
                })
            })
            .catch(next)
    }

    static updateProduct(req, res, next) {

        const { name, description, price, stock } = req.body

        Product.findById(req.params.id)
        .then(product => {
            let image = null
            if(req.file) {
                image = req.file.cloudStoragePublicUrl
            }else {
                image = product.image
            }
            return Product.findByIdAndUpdate(req.params.id, {
                $set: {
                    name,
                    description,
                    image,
                    price,
                    stock
                }
            }, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
        })
        .then(product => {
            res.json({ product })
        })
        .catch(next)

    }

    static search(req, res, next) {
        let name = req.query.name
        let regex = new RegExp(name,'i')
        Product.find({ name: regex }).limit(10)
            .then(products => {
                res.json({
                    products
                })
            })
            .catch(next)
    }




}


module.exports = ProductController





