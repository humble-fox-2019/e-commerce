const cartModel = require('../model/cart')
const productModel = require('../model/product')


class CartModel {

    static create(req, res, next) {
        let obj = {
            userId: req.headers.payload.id,
            productId: req.params.id,
            status: 'pending'
        }
        cartModel.create(obj)
            .then(data => {
                return Promise.all(([data, productModel.findById(req.params.id)]))
            })
            .then(([data, product]) => {
                let currentAmount = product.stock
                let newStock = currentAmount - 1

                return Promise.all(([data, productModel.updateOne({
                        _id: req.params.id
                    }, {
                        $set: {
                            stock: newStock
                        }
                    })]))
                    .then(([data]) => {
                        console.log(data)
                    })
                    .catch(next)

            })
    }
    static getUserCart(req, res, next) {
        CartModel.find({
                _id: req.headers.payload.id
            })
            .populate('productId')
            .then(data => {
                res.status(201).json({
                    data
                })
            })
            .catch(next)
    }



}

module.exports = CartModel