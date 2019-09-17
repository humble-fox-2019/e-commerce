const Product = require('../models/product');

class ProductController {
    static findAll(req, res, next) {
        Product.find()
               .then(products => {
                //    console.log(products)
                   res.status(200).json(products);
               })
               .catch(next);
    }

    static findOne(req, res, next) {
        const _id = req.params.id;
        Product.findOne({_id})
               .then(product => {
                   res.status(200).json(product)
               })
               .catch(next);
    }

    static create(req, res, next) {
        const { name, description, price, stock } = req.body;

        Product.create({ name, description, price, stock })
               .then(product => {
                   res.status(201).json(product);
               })
               .catch(next);
    }

    static update(req, res, next) {
        const { name, description, price, stock } = req.body;
        const _id = req.params.id;

        Product.updateOne({ _id }, { name, description, price, stock })
               .then(product => {
                   res.status(200).json(product);
                })
                .catch(next);
    }

    static delete(req, res, next) {
        const _id = req.params.id;

        Product.deleteOne({ _id })
               .then(ok => {
                   res.status(200).json(ok);
               })
               .catch(next);
    }
}

module.exports = ProductController;