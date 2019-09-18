const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product Name is required']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  stock : {
    type : Number
  }
}, {
  timestamps: true,
  versionKey: false
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product