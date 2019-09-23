const mongoose = require('mongoose')
const schema = mongoose.Schema


const productSchema = new schema({
    productName: {
        type: String,
        required: [true, 'Name Required']
    },
    description: {
        type: String,
        require: [true, 'Description Required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock Required']
    },
    price: {
        type: Number,
        required: [true, 'Price Required']
    },
    image_url: {
        type: String
    }
}, {
    timestamps: true
})

let product = mongoose.model('Product', productSchema)

module.exports = product


