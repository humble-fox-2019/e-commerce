const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  status: {
    type: Boolean,
    default: false
  },
  onProgress: {
    type: Boolean,
    default: false
  },
  items: {
    type: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        qty: Number,
      }
    ]
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)