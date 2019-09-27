const Product = require('../models/product')
const Cart = require('../models/cart')


class ProductController {
    static GetAll(req, res, next) {
        //console.log('hello');
        Product.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static GetOne(req, res, next) {
        Product.findById(req.params.productId)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static create(req, res, next) {
        console.log(req.body);
        let newProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            qty: req.body.qty,
            image: ''
        }
        if (req.file) {
            newProduct.image = req.file.cloudStoragePublicUrl
        }
        Product.create(newProduct)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}
module.exports = ProductController