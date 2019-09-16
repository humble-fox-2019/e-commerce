const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required']
    },
    description: {
        type: String,
        required: [true, 'description required']
    },
    image: {
        type: String,
        required: [true, 'image required']
    },
    price: {
        type: Number,
        required: [true, 'price required'],
        min: [1, 'invalid price']
    },
    stock: {
        type: Number,
        required: [true, 'stock required'],
        min: [1, 'invalid stock'],
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }
})



const Product = mongoose.model('Product', productSchema)

module.exports = Product


