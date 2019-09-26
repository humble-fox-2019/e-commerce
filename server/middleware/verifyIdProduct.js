const Product = require('../models/Product')

function verifyIdProduct(req, res, next) {
  Product.findById(req.body.id)
  .then(product => {
    if(product) {
      next()
    }else {
      next({
        status: 404,
        message: 'Product not found'
      })
    }
  })
  .catch(next)
}

module.exports = verifyIdProduct
