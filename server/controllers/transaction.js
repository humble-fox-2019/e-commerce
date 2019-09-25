const Transaction = require('../models/transaction');

class TransactionController {

    static findAll(req, res, next) {
        const UserId = req.decode._id;
        Transaction.find({
            UserId
        })
            .then(transactions => {
                res.status(200).json(transactions);
            }).catch(next);
    }

    static find(req, res, next) {
        Transaction.find()
            .then(transactions => {
                res.status(200).json(transactions);
            }).catch(next);
    }

    static pay(req, res, next) {
        const _id = req.params.id;
        Transaction.update({
            _id
        }, {
                payment: true
            }, {
                new: true
            })
            .then(transaction => {
                res.status(200).json(transaction);
            })
            .catch(next);
    }

    static verified(req, res, next) {
        const _id = req.params.id;
        Transaction.update({
            _id
        }, {
                delivery: true
            }, {
                new: true
            })
            .then(transaction => {
                res.status(200).json(transaction);
            })
            .catch(next);
    }

    static recieved(req, res, next) {
        const _id = req.params.id;
        Transaction.update({
            _id
        }, {
                recieved: true
            }, {
                new: true
            })
            .then(transaction => {
                res.status(200).json(transaction);
            })
            .catch(next);
    }

}

module.exports = TransactionController;