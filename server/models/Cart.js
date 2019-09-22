const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User required']
  },
  quantity: {
    type: Number,
    default: 1
  }
})


const Cart = mongoose.model('Cart', cartSchema)


module.exports = Cart


