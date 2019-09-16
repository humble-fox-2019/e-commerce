const Product = require('../models/product');

class ProductController {
    static findAll(req, res, next) {
        let where = {};
        if (req.query.name) {
            where = { "name": { $regex: '.*' + req.query.name + '.*' } }
        }
        Product.find(where)
            .then(products => {
                if (products.length > 0) {
                    res.status(200).json(products);
                } else {
                    next({ statusCode: 404 });
                }
            }).catch(next);
    }

    static store(req, res, next) {
        const { name, price, description, image, category, stock } = req.body;
        Product.create(
            { name, price, description, image, category, stock }
        ).then(product => {
            res.status(201).json(product)
        }).catch(next);
    }

    static findOne(req, res, next) {
        Product.findOne({
            _id: req.params.id
        }).then(product => {
            if (product) {
                res.status(200).json(product);
            } else {
                next({ statusCode: 404 });
            }
        }).catch(next);
    }

    static update(req, res, next) {
        const { name, price, description, image, category, stock } = req.body;
        const data = { name, price, description, image, category, stock };

        Product.findOneAndUpdate({ _id: req.params.id }, data, { omitUndefined: true, runValidators: true })
            .then(data => {
                res.status(200).json({ message: 'successfully updated', data });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Product.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }
}

module.exports = ProductController
