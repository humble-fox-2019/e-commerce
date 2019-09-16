const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required']
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
})

module.exports = mongoose.model('Product', productSchema)