const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    versionKey: false,
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;