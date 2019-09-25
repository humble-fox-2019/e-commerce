const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dogList: [],
    payment: {
        type: Boolean,
        required: true
    },
    delivery: {
        type: Boolean,
        required: true
    },
    recieved: {
        type: Boolean,
        required: true
    },
})

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;