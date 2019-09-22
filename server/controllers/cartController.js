const Cart = require('../models/cart');

class CartController {
    static getMyCart(req, res, next) {
        Cart.find({
            userid: req.decode.id
        })
            .populate('productid')
            .then(carts => {
            res.status(200).json(carts);
        }).catch(next);
    }

    static store(req, res, next) {
        const { productid, qty } = req.body;
        let userid = req.decode.id
        Cart.create(
            { productid, userid, qty }
        ).then(cart => {
            res.status(201).json(cart)
        }).catch(next);
    }

    static update(req, res, next) {
        const { qty } = req.body;
        const data = { qty };
        let userid = req.decode.id

        Cart.findOneAndUpdate({ _id: req.params.id, userid }, data, { omitUndefined: true, runValidators: true })
            .then(data => {
                res.status(200).json({ message: 'successfully updated', data });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        let userid = req.decode.id

        Cart.findByIdAndDelete({
            _id: req.params.id, userid
        }).then(data => {
            res.status(200).json({ message: 'successfully deleted', data });
        })
            .catch(next);
    }
}

module.exports = CartController
