const Product = require('../models/Product')

function productAuthorization(req, res, next) {
  Product.findById(req.params.id)
    .then(product => {
      if(product) {
        if(product.store == req.decode.id) {
          next()
        }else{
          next({
            status: 401,
            message: 'Not authorized'
          })
        }
      }else{
        next({
          status: 404,
          message: 'Product not found'
        })
      }
    })
    .catch(next)
}


module.exports = productAuthorization
