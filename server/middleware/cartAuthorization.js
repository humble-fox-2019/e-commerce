const Cart = require('../models/Cart')

function cartAuthorization(req, res, next) {
  Cart.findById(req.params.id)
    .then(cart => {
      if(cart) {
        if(cart.user == req.decode.id) {
          next()
        }else {
          next({
            status: 401,
            message: 'You are not authorized'
          })
        }
      }else {
        next({
          status: 404,
          message: 'Cart not found'
        })
      }
    })
    .catch(next)
}



module.exports = cartAuthorization
