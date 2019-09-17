const Cart = require('../models/cart');

class CartController {
    static findAll(req, res, next) {
        let where = {};
        if (req.query.productid) {
            where = { "productid": { $regex: '.*' + req.query.productid + '.*' } }
        }
        Cart.find(where)
            .then(carts => {
                res.status(200).json(carts);
            }).catch(next);
    }

    static store(req, res, next) {
        const { productid, userid, qty } = req.body;
        Cart.create(
            { productid, userid, qty }
        ).then(cart => {
            res.status(201).json(cart)
        }).catch(next);
    }

    static findOne(req, res, next) {
        Cart.findOne({
            _id: req.params.id
        }).then(cart => {
            res.status(200).json(cart);
        }).catch(next);
    }

    static update(req, res, next) {
        const { productid, userid, qty } = req.body;
        const data = { productid, userid, qty };

        Cart.findOneAndUpdate({ _id: req.params.id }, data, { omitUndefined: true, runValidators: true })
            .then(data => {
                res.status(200).json({ message: 'successfully updated', data });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Cart.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }
}

module.exports = CartController
