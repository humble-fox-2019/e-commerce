const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    productid: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'product is required']
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    },
    qty: {
        type: Number,
        required: [true, 'qty is required']
    }
}, {
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
