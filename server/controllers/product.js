const Product = require('../models/product');
const Cart = require('../models/cart');

class ProductController {
    static getAll ( req , res , next ) {
        Product.find()
        .then( products => {
            res.status(200).json( products );
        })
        .catch( next );
    }
    static create( req, res ,next ) {
        const { name , price , stock , imageURL , category } = req.body
        Product.create({ name, price, stock, imageURL , category })
        .then( createdProduct => {
            res.status(201).json( createdProduct );
        })
        .catch( next );
    }
    static update( req, res ,next ){
        const productId = req.params.id;
        let { name , price , stock , imageURL , category } =req.body;
        if ( !imageURL ) imageURL = 'http://capefearkitefestival.org/wp-content/themes/cardinal/images/default-thumb.png'
        Product.findOneAndUpdate(
            { _id : productId } ,
            { name , price , stock , imageURL , category },
            { runValidators : true }
        )
        .then( previousUpdatedProduct => {
            res.status(200).json({ message : "Product Updated!"})
        })
        .catch( next )
    }
    static delete ( req, res , next ) {
        const productId = req.params.id;
        Product.findByIdAndDelete( productId )
        .then( deletedProduct => {
            res.status(200).json({ message: "Product Deleted!" , deletedProduct })
        })
        .catch( next )
    }

    static addToCart ( req, res ,next ) {
        const user = req.decode
        const { productId , quantity } = req.body;
        Cart.create({ userId : user.id , productId , quantity })
        .then( cart => {
            res.status(201).json({ message : "Cart Created", cart }) 
        })
        .catch( next )
    }
    static getUserCart ( req, res ,next ) {
        const userId = req.decode.id;
        Cart.find({ userId }).populate('productId')
        .then ( cart => {
            res.status(200).json( cart );
        })
        .catch( next )
    }
    static updateCartQuantity ( req, res ,next ) {
        const cartId = req.params.id;
        const quantity = req.body.quantity;
        Cart.findOneAndUpdate(
            { _id: cartId },
            { quantity }
        )
        .then ( updatedCart => {
            res.status(200).json({ message: "Product Quantity Updated" , updatedCart })
        })
        .catch( next )
    }
    static deleteProductCart ( req, res, next ) {
        const cartId = req.params.id;

        Cart.findOneAndDelete({ _id : cartId })
        .then ( deletedProduct => {
            res.status(200).json({ message : "Product Deleted from cart" , deletedProduct });
        })
        .catch( next );
    }
}

module.exports = ProductController