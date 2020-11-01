const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required']
    },
    products: [
        {
            ProductId: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            count: {
                type: Number,
                default: 1
            }
        }
    ],
    total : {
        type: Number,
        required: [true, 'Total is required']
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction