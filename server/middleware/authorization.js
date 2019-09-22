const Product = require('../models/Product')

module.exports = (req, res, next) => {
    const ProductId = req.params.ProductId
    const id = req.decode.id
    const role = req.decode.role
    if (role !== 'Admin') {
        let err = new Error('You have no permission to edit')
        err.name = "AuthorizationError"
        next(err)
    } else {
        Product.findById(ProductId)
            .then((Product) => {
                if (Product) {
                    if (Product.owner == id) {
                        next()
                    } else {
                        let err = new Error('You have no authorization on this Product')
                        err.name = 'AuthorizationError'
                        next(err)
                    }
                } else {
                    let err = new Error('Product does not exist')
                    err.name = 'NotFound'
                    next(err)
                }
            }).catch(next);
    }
}