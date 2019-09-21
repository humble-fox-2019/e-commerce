const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Item must have a title']
    },
    description: {
        type: String,
        required: [true, 'Item must have a description'],
    },
    price: {
        type: Number,
        required: [true, 'Item must have a price'],
        min: [1, 'Item must have a price']
    },
    qty: {
        type: Number,
        default: 1,
        min: [1, 'Item must have a quantity']
    },
    image: {
        type: String,
        required: [true, 'Item must have an image']
    },
    brand: {
        type: String,
        enum: ['Nike', 'Adidas', 'New Balance'],
        required: [true, 'Item must have a brand']
    }
}, { timestamps : true })

const Product = mongoose.model('Product', productSchema)
module.exports = Product