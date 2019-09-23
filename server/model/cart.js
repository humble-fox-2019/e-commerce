const mongoose = require('mongoose')
const schema = mongoose.Schema

const cartSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
})

const cart = mongoose.model('Cart', cartSchema)

module.exports = cart   