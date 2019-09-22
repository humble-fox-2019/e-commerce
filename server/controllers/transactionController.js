const Transaction = require('../models/Transaction')
const User = require('../models/User')
const Cart = require('../models/Cart')

class TransactionController {

  static create(req, res, next) {
    if(!req.body.carts) {
      res.status(400).json({
        message: 'Cart required'
      })
    }else {
      let carts = req.body.carts
      let promises = []
      for(let i=0;i<carts.length;i++) {
        promises.push(
          Transaction.create({
            product: carts[i].product._id,
            quantity: carts[i].quantity,
            store: carts[i].store,
            user: req.decode.id
          })
        )
        promises.push(
          Cart.findByIdAndDelete(carts[i]._id)
        )
      }
      Promise.all(promises)
        .then(data => {
          return User.findByIdAndUpdate(req.decode.id, {
            $set: {
              carts: []
            }
          })
        })
        .then(user => {
          res.json(user)
        })
        .catch(next)
    }
    
  }

  static getAll(req, res, next) {
    if(req.isUser) {
      Transaction.find({ user: req.decode.id })
        .populate({
          path: 'product',
          populate: {
            path: 'store'
          }
        })
        .then(transactions => {
          res.json(transactions)
        })
        .catch(next)
    }else if(req.isStore) {
      Transaction.find({ store: req.decode.id })
        .populate('user')
        .then(transactions => {
            res.json(transactions)
          })
          .catch(next)
    }
  }

}


module.exports = TransactionController



