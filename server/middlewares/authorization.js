//If user id is the same as the product's owner id then allow update and delete shopping cart
const { verifyToken } = require('../helpers/jwt')
const Product = require('../models/product')

function authorization (req,res,next){
    let decode = verifyToken( req.headers.token )
    req.decode = decode
    Product.findById(req.body.id).then((product) =>{
        if (product.owner === req.decode.id){
            next()
        } else {
            next({
                status:404, 
                message: "unauthorized"}) 
        }
    })
    .catch (next)
}

module.exports = authorization