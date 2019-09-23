const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    products: Array,
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'buyer is required']
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    status: {
        type: String,
        required: [true, 'status is required']
    }
}, {
    timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
