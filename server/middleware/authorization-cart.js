const Cart = require('../models/Cart')

module.exports = (req, res, next) => {
    const CartId = req.params.id
    const id = req.decode.id

    Cart.findById(CartId)
        .then((Cart) => {
            if (Cart) {
                if (Cart.userId == id) {
                    next()
                } else {
                    let err = new Error('You have no authorization on this Cart')
                    err.name = 'AuthorizationError'
                    next(err)
                }
            } else {
                let err = new Error('Cart does not exist')
                err.name = 'NotFound'
                next(err)
            }
        }).catch(next);

}