const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('mongoose-type-url')

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please put product name"]
    },
    description: {
        type: String,
        default: "No Description"
    },
    stock: {
        type: Number,
        required: [true, "You must put at least 1 stock item"],
        min: [1, "You must put at least 1 stock item"]
    },
    images: {
        type: [{ type: mongoose.SchemaTypes.Url }]
    },
    price: {
        type: Number,
        required: [true, "Please set a price"],
        min: [0, "You can't put a negative price"]
    }
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product