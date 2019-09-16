const { Product } = require('../models')

module.exports = (req, res, next) => {
  const { id } = req.params
  Product.findById(id)
    .then(products => {
      if (products) {
        if (products.sellerId == req.decode.id) {
          next()
        } else {
          next({ status: 400, message: 'Unauthorized' })
        }
      } else next({ status: 400, message: 'Unauthorized' })
    })
}