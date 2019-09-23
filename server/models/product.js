var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name : {
      type : String,
      required : [true , 'Name Required']
  },
  price : {
      type : Number,
      required : [true , 'Price Required'],
      min : [1000 , 'minimal harga produk 1000']
  },
  stock : {
    type : Number ,
    required : [true , 'Stock Required'],
    min : [1 , 'minimal stock 1']
  },
  image : {
    type : String,
    required : [true , 'Image Required']
  }
});

let Product = mongoose.model('Product' , ProductSchema)


module.exports = Product
