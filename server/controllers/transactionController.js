const Transaction = require('../models/transaction');

class TransactionController {
    static findAll(req, res, next) {
        Transaction.find({})
            .then(transactions => {
                res.status(200).json(transactions);
            }).catch(next);
    }

    static store(req, res, next) {
        const { products, buyer, address, status } = req.body;
        Transaction.create(
            { products, buyer, address, status }
        ).then(transaction => {
            res.status(201).json(transaction)
        }).catch(next);
    }

    static findOne(req, res, next) {
        Transaction.findOne({
            _id: req.params.id
        }).then(transaction => {
            res.status(200).json(transaction);
        }).catch(next);
    }

    static update(req, res, next) {
        const { products, buyer, address, status } = req.body;
        const data = { products, buyer, address, status };

        Transaction.findOneAndUpdate({ _id: req.params.id }, data, { omitUndefined: true, runValidators: true })
            .then(data => {
                res.status(200).json({ message: 'successfully updated', data });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Transaction.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }
}

module.exports = TransactionController
