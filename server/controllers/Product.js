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

    static update(req, res, next) {
        const id = req.params.id
        const { name, description, stock, price } = req.body
        Product.update({ _id: id }, { $set: { name, description, stock, price } }, { runValidators: true })
            .then((product) => {
                res.status(200).json(product)
            }).catch(next);
    }

    static delete(req, res, next) {
        const id = req.params.id
        Product.delete({ _id: id })
            .then((Product) => {
                res.status(200).json(Product)
            })
            .catch(next);
    };
};

module.exports = ProductController