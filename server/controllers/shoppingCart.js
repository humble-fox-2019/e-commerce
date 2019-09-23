const ShoppingCart = require('../models/shoppingCart')
const { verifyToken } = require('../helpers/jwt')

class shoppingCartController {
    static create(req,res,next){
        /* const decode = verifyToken(req.headers.token)
        req.decode = decode */
        ShoppingCart.create({
            items : [],
            owner : req.decode.id
        })
        .then((shoppingCart)=>{
            res.status(200).json({
                shoppingCart
            })
        })
        .catch(next)
    }

    static addItem(req,res,next){
        /* const decode = verifyToken(req.headers.token)
        req.decode = decode */
        ShoppingCart.findOne({ owner : req.decode.id })
        .then((shoppingCart) =>{
            if (shoppingCart){
                shoppingCart.items.push(req.body.itemId)
            } else {
                next({
                    status:404, 
                    message: "shopping cart for this user not found"
                })
            }
        })
        .catch(next)
    }

    static find(req,res,next){
        /* const decode = verifyToken(req.headers.token)
        req.decode = decode */
        ShoppingCart.findOne({ owner : req.decode.id })
        .then((shoppingCart) =>{
            if (shoppingCart){
                res.status(200).json({
                    shoppingCart
                })
            } else {
                next({
                    status:404, 
                    message: "shopping cart not found"
                })
            }
        })
        .catch(next)
    }

    static delete(req,res,next){
        /* const decode = verifyToken(req.headers.token)
        req.decode = decode */
        ShoppingCart.findOneAndDelete({ owner : req.decode.id })
        .then(() =>{
            res.status(200).json({
                message : 'deleted'
            })
        })
        .catch(next)
    }
}

module.exports = shoppingCartController