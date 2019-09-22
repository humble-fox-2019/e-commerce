const Cart = require('../models/Cart');

class CartController {

    static add(req, res, next) {
        const id = req.decode.id
        const { productId, quantity } = req.body
        const products = { productId, quantity }
        // Cart.find({ userId: id })
        //     .then((result) => {
        //         res.status(201).json(result)
        //         if (result) {
        //             Cart.findByIdAndUpdate(result._id, { $push: { products } })
        //         } else {
        //             Cart.create({ products, userId: id })
        //         }
        //     })
        //     .then(cart => {
        //         res.status(201).json(cart)
        //     })
        //     .catch(next);
        Cart.findOneAndUpdate({ userId: id }, { $push: { products } }, { upsert: true })
            .then((result) => {
                res.status(201).json(result)
            }).catch(next);
    }

    static read(req, res, next) {
        const id = req.decode.id
        Cart.find({ userId: id })
            .populate('products')
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static modify(req, res, next) {
        const id = req.decode.id
        const { products } = req.body
        Cart.findOneAndReplace({ userId: id }, { products })
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static pay(req, res, next) {
        const id = req.decode.id
        Cart.update({ userId: id }, { $set: { paid: true } })
            .then((result) => {
                res.status(201).json(result)
            }).catch(next);
    }

    static destroy(req, res, next) {
        const id = req.decode.id
        Cart.findOneAndDelete({ userId: id })
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }
};

module.exports = CartController