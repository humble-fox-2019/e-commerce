const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
function adminAuthorization ( req, res ,next ) {
    const userId = req.decode.id
    User.findById( userId )
    .then ( user => {
        if ( user.role == 'admin') 
            next()
        else {
            next({ status : 401 , message: "You must be admin to use this feature!"})
        }
    })
    .catch( next ) 
}
function customerAuthorization ( req, res, next ){
    const userId = req.decode.id
    User.findById( userId )
    .then ( user => {
        if ( user.role == 'customer') 
            next()
        else {
            next({ status: 401 , message: "You must be a customer to use this feature!"})
        }
    })
    .catch( next ) 
}

function productOwner ( req ,res ,next ) {
    const userId = req.decode.id;
    const cartId = req.params.id;
    Cart.findById( cartId )
    .then( cart => {
        if ( cart.userId == userId ) {
            next()
        } else {
            next({ status: 401 , message: "Not Authorized!"})
        }
    })
    .catch( next )
}
function checkStock ( req ,res ,next ) {
    const cartId = req.params.id;
    const quantity = req.body.quantity;
    Cart.findById( cartId )
    .then( cart => {
        let productId = cart.productId;
        return Product.findOne({ _id : productId })
    })
    .then( product => {
        if ( product ) {
            if ( quantity > product.stock ) {
                next ({ status : 400 , message : "Cannot update quantity more than available stock"})
            } else if ( quantity < 0 ) {
                next({ status: 400 , message : "Cannot update quantity less than 0"})
            } else {
                next()
            }
        } else {
            next({ status: 404 , message : "Update Product Not Found"})
        }
    })
    .catch( next )
}

module.exports = {
    adminAuthorization,
    customerAuthorization,
    checkStock,
    productOwner
}