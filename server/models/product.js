const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    }, 
    description: {
        type: String,
        required: [true, 'Description field is required']
    }, 
    image: {
        type: String,
        default: 'https://www.pdma.org/global_graphics/default-store-350x350.jpg'
    },
    price: {
        type: Number,
        required: [true, 'Price field is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock field is required']
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;