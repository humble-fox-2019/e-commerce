const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    productid: {
        type: String,
        required: [true, 'productid is required']
    },
    userid: {
        type: String,
        required: [true, 'userid is required']
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
