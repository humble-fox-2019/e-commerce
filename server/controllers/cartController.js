const Cart = require('../models/cart');
const Product = require('../models/product');
const Transaction = require('../models/transaction');
 
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

        Cart.findOne({ userid, productid })
            .then((found) => {
                if (found) {
                    next({ statusCode: 400, msg: "The Product already in cart" })
                } else {
                    return Cart.create({ productid, userid, qty });
                }
            }).then(data => {
                res.status(201).json({ message: 'successfully created', data })
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

    static checkout(req, res, next) {
        let userid = req.decode.id;
        
        let dataCart = [];
        Cart.find({
            userid
        }).populate('productid')
            .then(carts => {
                if (carts.length === 0) {
                    next({ statusCode: 404, msg: "please add products to cart first" });
                } else {
                    let errors = [];
                    
                    carts.forEach(el => {
                        if (el.qty > el.productid.stock) {
                            errors.push(`stock ${el.productid.name} not enought`);
                        }
                        
                        dataCart.push({
                            productid: el.productid._id,
                            name: el.productid.name,
                            qty: el.qty,
                            price: el.productid.price,
                            stock: el.productid.stock
                        })
                    });
                    
                    if (errors.length > 0) {
                        throw next({ statusCode: 400, msg: errors });
                    } else {
                        return Transaction.create({
                            products: dataCart, buyer: userid, address: req.body.address, status: 'pending'
                        });
                    }
                }
            }).then(transaction => {
                let promises = [];

                dataCart.forEach(el => {
                    promises.push(Product.updateOne({ _id: el.productid }, { stock: el.stock - el.qty }));
                });

                return Promise.all(promises);
            })
            .then(response => {
                return Cart.deleteMany({ userid });
            }).then(deleteMany => {
                res.status(200).json({ message: 'successfully checkout' });
            }).catch(next);
    }
}

module.exports = CartController
