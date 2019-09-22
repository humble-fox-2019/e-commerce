const Cart = require('../models/Cart')
const User = require('../models/User')
const Product = require('../models/Product')

class CartController {

    static create(req, res, next) {

        Cart.create({ user: req.decode.id, product: req.body.id })
            .then(cart => {
                return User.findByIdAndUpdate(req.decode.id, {
                    $push: {
                        carts: cart._id
                    }
                }, {
                    new: true,
                    useFindAndModify: false
                })
                .populate('carts', 'product')
            })
            .then(user => {
                res.json(user)
            })
            .catch(next)
    }

    static getAll(req, res, next) {
        Cart.find({ user: req.decode.id }, 'product quantity')
            .populate('product')
            .then(carts => {
                res.json(carts)
            })
            .catch(next)
    }

    static addQuantity(req, res, next) {
        let cart = null
        Cart.findById(req.params.id)
            .then(result => {
                cart = result
                return Cart.findByIdAndUpdate(req.params.id, {
                    $set: {
                        quantity: cart.quantity + 1
                    }
                }, {
                    new: true,
                    useFindAndModify: false
                })
            })
            .then(cart => {
                res.json(cart)
            })
            .catch(next)
    }
    static minusQuantity(req, res, next) {
        let cart = null
        Cart.findById(req.params.id)
            .then(result => {
                cart = result
                return Cart.findByIdAndUpdate(req.params.id, {
                    $set: {
                        quantity: cart.quantity - 1
                    }
                }, {
                    new: true,
                    useFindAndModify: false
                })
            })
            .then(cart => {
                res.json(cart)
            })
            .catch(next)
    }

    static remove(req, res, next) {
        Cart.findByIdAndDelete(req.params.id)
            .then(cart => {
                res.json({
                    status: 200,
                    message: 'Success remove cart'
                })
            })
            .catch(next)
    }

}



module.exports = CartController
