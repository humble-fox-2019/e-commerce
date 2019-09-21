const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  status: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    default: []
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)