const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name must be filled']
    },
    size: {
        type: Number,
        required: [true, `size must be filled`]
    },
    color: String,
    stock: {
        type: Number,
        required: `stock must be filled`
    },
    price: {
        type: Number,
        required: [true, `price must be filled`]
    },
    photo: {
        type: String,
        required: [true, `image must be uploaded`]
    },
    status: {
        type: String
    }
}, {
        timestamps: true
    })

const Product = mongoose.model('Product', productSchema)
module.exports = Product