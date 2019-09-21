const { Cart } = require('../models')

class CartController {
  static create(req, res, next) {
    const userId = req.decode.id
    Cart.create({ userId })
      .then(cart => {
        res.status(201).json({ cart })
      })
      .catch(next)
  }
}

module.exports = CartController