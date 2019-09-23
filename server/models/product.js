const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    price : {
        type : Number,
        min : [0, "Price can't be minus"],
        required: [true , "Price is required"]
    },
    stock : {
        type : Number,
        required: [true, "Stock is required"],
        min: [0 , "Stock can't be minus"]
    },
    description : {
        type : String,
        required: [true, "Description is required"],
        maxlength: [100 , "Description Max(100)Character"]
    },
    imageURL : {
        type : String,
        default : `http://capefearkitefestival.org/wp-content/themes/cardinal/images/default-thumb.png`
    },
    category : {
        type: String,
        required: [true, 'Category is required']
    }
},
{
    timestamps: true,
    versionKey:false
})


const Product = mongoose.model('Product' , productSchema ) ;
module.exports = Product