const Cart = require('../models/cart');
const Pet = require('../models/pet');
const User = require('../models/user');
const Transaction = require('../models/transaction');

class CartController {

    static setIn(req, res, next) {
        let CartId = '';
        const id = req.params.id;
        const { _id } = req.decode;
        User.findById(_id)
            .then(user => {
                return Cart.findOne({
                    UserId: user._id
                })
            })
            .then(cart => {
                CartId = cart._id;
                return Pet.findById(id)
            })
            .then(pet => {
                let { species, price, photo } = pet;
                pet = {
                    id,
                    species,
                    price,
                    photo,
                    qty: 1
                }
                return Cart.update(
                    { _id: CartId },
                    {
                        $push: { cartList: pet }
                    }, {
                        new: true
                    })
            })
            .then(cart => {
                res.status(200).json({
                    message: `Success add this pet to your cart`
                });
            })
            .catch(next);
    }

    static setOut(req, res, next) {
        let CartId = '';
        const id = req.params.id;
        const { _id } = req.decode;
        User.findById(_id)
            .then(user => {
                return Cart.findOne({
                    UserId: user._id
                })
            })
            .then(cart => {
                CartId = cart._id;
                return Pet.findById(id)
            })
            .then(pet => {
                let { species, price, photo } = pet;
                let data = {
                    id,
                    species,
                    price,
                    photo,
                    qty: 1
                }
                return Cart.update(
                    { _id: CartId },
                    {
                        $pull: { cartList: data }
                    }, {
                        new: true
                    })
            })
            .then(cart => {
                res.status(200).json({
                    message: `Success remove this pet from your cart`
                });
            })
            .catch(next);
    }

    static readOne(req, res, next) {
        const UserId = req.decode._id;
        Cart.findOne({
            UserId
        })
            .then(cart => {
                res.status(200).json(cart);
            })
            .catch(next);
    }

    static checkout(req, res, next) {
        let receipt = ''
        const UserId = req.decode._id;
        Cart.findOne({
            UserId
        })
            .then(cart => {
                return Transaction.create({
                    UserId,
                    dogList: [...cart.cartList],
                    payment: false,
                    delivery: false,
                    recieved: false,
                })
            })
            .then(transaction => {
                receipt = transaction
                return Cart.update({
                    UserId
                }, {
                        cartList: [],
                    })
            })
            .then(() => {
                res.status(201).json(receipt);
            })
            .catch(next);
    }
}

module.exports = CartController;