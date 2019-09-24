const Product = require('../models/product')
const deleteFile = require('../helpers/images').deleteFile

class ProductController {
    static createProduct(req, res, next) {
        let {
            name,
            price,
            stock
        } = req.body
        let featured_image = null
        if (req.file) {
            featured_image = req.file.cloudStoragePublicUrl
        } else {
            featured_image = 'test'
        }
        Product.create({
            name,
            price,
            stock,
            featured_image
        }).then(data => {
            res.status(201).json({
                data
            })
        }).catch(next)
    }

    static getProducts(req, res, next) {
        Product.find().sort({
                createdAt: -1
            })
            .then(data => {
                res.status(200).json({
                    data
                })
            }).catch(next)
    }

    static deleteProduct(req, res, next) {
        let {
            id
        } = req.params
        Product.findByIdAndDelete(id)
            .then(data => {
                if (data.image) {
                    deleteFile(req, res, next, data.image)
                } else {
                    res.status(200).json({
                        data
                    })
                }
            }).catch(next)
    }

    static updateProduct(req, res, next) {
        let {
            id
        } = req.params
        let updatedData = {}
        if (req.file) {
            req.body.name && (updatedData.name = req.body.name)
            req.body.price && (updatedData.price = req.body.price)
            req.file.cloudStoragePublicUrl && (updatedData.image = req.cloudStoragePublicUrl)
            req.body.stock && (updatedData.stock = req.body.stock)
        } else {
            req.body.name && (updatedData.name = req.body.name)
            req.body.price && (updatedData.price = req.body.price)
            req.body.image && (updatedData.image = req.body.image)
            req.body.stock && (updatedData.stock = req.body.stock)
        }
        Product.findByIdAndUpdate(
            id,
            updatedData, {
                new: true,
                runValidators: true
            }
        ).then(data => {
            res.status(200).json({
                data
            })
        }).catch(next)
    }

    static getOne(req, res, next) {
        let {
            id
        } = req.params
        Product.findById(id)
            .then(data => {
                res.status(200).json({
                    data
                })
            }).catch(next)
    }





}

module.exports = ProductController;