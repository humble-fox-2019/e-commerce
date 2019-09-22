const mongoose = require('mongoose');
const Schema = mongoose.Schema

/* ProductId

Quantity

UserId

Status */

const CartSchema = new Schema({
    products: [{
        productId:
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }, quantity: {
            type: Number,
            required: [true, 'Minimum quantity is at least 1']
        }
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    paid: {
        type: Boolean,
        default: false
    }
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart