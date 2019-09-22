const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  carts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }],
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  },
  status: {
    type: Number,
    default: 0
  }
})


const Transaction = mongoose.model('Transaction', transactionSchema)


module.exports = Transaction

