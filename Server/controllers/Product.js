const Product = require('../models/Product');

class ProductController {
    static create(req, res, next) {
        const { name, description, stock, images, price } = req.body
        Product.create({ name, description, stock, images, price, owner: req.decode.id })
            .then((Product) => {

                res.status(201).json(Product)
            })
            .catch(next);
    };
    static read(req, res, next) {
        Product.find({})
            .then((Products) => {

                res.status(200).json(Products)
            })
            .catch(next);
    };

};

module.exports = ProductController