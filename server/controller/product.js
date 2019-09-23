const productModel = require('../model/product')

class ProductController {

    static create(req, res, next) {
        let obj = {
            productName: req.body.productName,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            image_url: req.body.imageUrl
        }
        console.log(obj, '<<< INI DATANYA OBJ')
        productModel.create(obj)
            .then(data => {
                res.status(201).json({
                    data
                })

            })
            .catch(err => {
                console.log(err, '<<< ERR DATANYA')
            })
    }

    static getAll(req, res, next) {
        productModel.find()
            .then(data => {
                res.status(201).json({
                    data
                })
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        productModel.findById(req.params.id)
            .then(data => {
                res.status(201).json({
                    data
                })
            })
            .catch(next)
    }
    static delete(req, res, next) {
        productModel.deleteOne({
            _id: req.params._id
        })
    }

    static update(req, res, next) {
        let obj = {
            productName: req.body.productName,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
        }
        productModel.updateOne(obj)
            .then(data => {
                res.status(201).json({
                    data
                })
            })
            .catch(next)

    }

}

module.exports = ProductController