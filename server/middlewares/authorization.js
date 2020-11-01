const User = require('../models/user');
const Transaction = require('../models/transaction');

module.exports = {
    isAdmin(req, res, next) {
        let role = req.decoded.role;
        
        if (role === 'admin') {
            next()
        } else {
            next({status: 401, message: "You haven't authorized"})
        }
    },
    isOwner(req, res, next) {
        const { _id } = req.decoded;
        const CartId = req.params.id;
        User.findById(_id)
            .then(user => {
                if (user) {
                    let foundCart = false;
                    user.cart.forEach(el => {
                        if (el._id == CartId) {
                            foundCart = true;
                        }
                    });

                    if (foundCart) {
                        next()
                    } else {
                        next({status: 401, message: "You haven't authorize with this cart!"});
                    }
                } else {
                    next({status: 401, message: "You haven't authorize with this cart!"});
                }
            })
            .catch(next)
        // next()
    },

    isTransactionOwner(req, res, next) {
        const UserId = req.decoded._id;
        const _id = req.params.id;

        Transaction.findOne({_id, UserId})
            .then(transaction => {
                if (transaction) {
                    next();
                } else {
                    next({status: 401, message: "You haven't authorize with this transaction!"});
                }
            })
            .catch(next);
    }
}