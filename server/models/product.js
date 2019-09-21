const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    author: {
        type: String,
        required: [true, 'author is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
    stock: {
        type: Number,
        required: [true, 'stock is required']
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
