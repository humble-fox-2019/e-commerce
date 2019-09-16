const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "userId is required"],
        ref : 'User'
    },
    productId : {
        type: String,
        required: [true, 'productId is required'],
        ref: 'Product'
    },
    quantity : {
        type : Number,
        required: [true, "Quantity is required"],
        min: [ 0 , "quantity min 0"]
    }
},
{
    timestamps: true,
    versionKey:false
})


const Cart = mongoose.model('Cart' , cartSchema ) ;
module.exports = Cart