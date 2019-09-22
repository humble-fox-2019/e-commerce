const Transaction = require('../models/transaction');
const User = require('../models/user');

class TransactionController {
    static create (req, res, next) {
        const UserId = req.decoded._id;
        // const { products } = req.body
        let products = [];
        let total = 0;

        User.findById(UserId).populate('cart.ProductId')
            .then(user => {
                products = user.cart;
                
                user.cart.forEach(cartItem => {
                    total += cartItem.count * cartItem.ProductId.price;
                });
                return User.updateOne({_id : UserId}, { "$set": {"cart": []}})
            })
            .then(() => {
                return Transaction.create({ UserId, products, total });
            })
            .then(() => {
                res.status(201).json('Checkout success!')
            })
            .catch(next);
    }

    static pay(req, res, next) {
        const _id = req.params.id;

        Transaction.findById(_id)
            .then(transaction => {
                if (transaction) {
                    transaction.status = 'paid';
                    return transaction.save();
                } else {
                    next({status: 400, message: 'Transaction ID is not valid'})
                }
            })
            .then(() => {
                res.status(200).json('Pay success!');
            })
            .catch(next);
    }

    static findAll(req, res, next) {
        const user = req.decoded;
        let filter = {}

        if (user.role !== 'admin') {
            filter.UserId = user._id
        }
        // console.log(filter)
        Transaction.find(filter).populate('products.ProductId').populate('UserId')
            .then(transactions => {
                // console.log(transactions)
                res.status(200).json(transactions);
            })
            .catch(next);
    }
}

module.exports = TransactionController;