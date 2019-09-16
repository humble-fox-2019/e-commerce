const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required']
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: [true, 'image required']
    },
    price: {
        type: Number,
        required: [true, 'price required']
    },
    quantity: {
        type: Number,
        required: [true, 'quantity required'],
        min: [1, 'invalid quantity'],
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }
})



const Product = mongoose.model('Product', productSchema)

module.exports = Product


