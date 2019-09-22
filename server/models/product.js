const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number
  },
  stock: {
    type: Number
  },
  des: {
    type: String
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
