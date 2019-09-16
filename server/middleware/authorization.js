const User = require('../models/user')
const Cart = require('../models/cart')
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
    Cart.findById({ _id : cartId })
    .then( cart => {
        if (cart.userId == userId ) {
            next()
        } else {
            next({ status: 401 , message: "Not Authorized!"})
        }
    })
    .catch( next )
}
function checkStock ( req ,res ,next ) {

}

module.exports = {
    adminAuthorization,
    customerAuthorization,
    checkStock,
    productOwner
}