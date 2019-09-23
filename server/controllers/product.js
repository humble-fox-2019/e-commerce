const Product = require('../models/product');
const Cart = require('../models/cart');
const { deleteFile } = require('../middleware/image')


class ProductController {
    static getAll ( req , res , next ) {
        Product.find()
        .then( products => {
            res.status(200).json( products );
        })
        .catch( next );
    }
    static getById ( req, res ,next ) {
        const productId = req.params.id;
        Product.findById( productId )
        .then( product => {
            if ( product )
                res.status(200).json( product );
            else   
                res.status(404).json({ message: "Product not found" })
        })
        .catch(next)
    }
    static create( req, res ,next ) {
        let imageURL;
        // console.log( req.file )
        if ( req.file )
            imageURL = req.file.url

        const { name , price , stock , category , description } = req.body
        // console.log(req.body, "<<<<<<<<<<")
        Product.create({ name, price, stock, imageURL , category , description })
        .then( createdProduct => {
            res.status(201).json( createdProduct );
        })
        .catch( next );
    }
    static updateStock( req, res ,next ) {
        const productId = req.params.id;
        const stock = req.body.stock
        Product.findOneAndUpdate(
            { _id : productId } ,
            { stock },
            { runValidators : true }
        )
        .then( previousUpdatedProduct => {
            res.status(200).json({ message : "Stock Updated!" , previousUpdatedProduct})
        })
        .catch( next )
    }
    static update( req, res ,next ){
        const productId = req.params.id;
        let imageURL;
        if ( req.file ){
            imageURL = req.file.url
        }
        // console.log( req.body.description , " <<<< ")
        let { name , price , stock , category , description } = req.body;

        let product = { name,price, stock, category , description }

        if ( imageURL ) {
            product = { name,price, stock, category, description , imageURL }
        }
        Product.findOneAndUpdate(
            { _id : productId } ,
            product,
            { runValidators : true }
        )
        .then( previousUpdatedProduct => {
            deleteFile( previousUpdatedProduct.imageURL )
            res.status(200).json({ message : "Product Updated!" , previousUpdatedProduct})
        })
        .catch( next )
    }
    static delete ( req, res , next ) {
        const productId = req.params.id;
        Product.findByIdAndDelete( productId )
        .then( deletedProduct => {
            deleteFile( deletedProduct.imageURL );
            res.status(200).json({ message: "Product Deleted!" , deletedProduct })
        })
        .catch( next )
    }

    static addToCart ( req, res ,next ) {
        const user = req.decode
        const { productId , quantity } = req.body;
        
        Cart.findOne({ userId : user.id , productId }).populate('productId').populate('userId')
        .then ( found => {
            if( found ) {
                res.status(200).json({ message : "Your Product already in your cart"})
            } else {
                return Cart.create({ userId : user.id , productId , quantity })
            }
        })
        .then( cart => {
            res.status(201).json({ message : "Added to Cart", cart }) 
        })
        .catch( next )

        // Cart.create({ userId : user.id , productId , quantity })
        // .then( cart => {
        //     res.status(201).json({ message : "Cart Created", cart }) 
        // })
        // .catch( next )
    }
    static getUserCart ( req, res ,next ) {
        const userId = req.decode.id;
        Cart.find({ userId }).populate('productId').populate('userId')
        .then ( cart => {
            res.status(200).json( cart );
        })
        .catch( next )
    }
    static getUserCartByProductId( req ,res ,next ) {
        const userId = req.decode.id;
        const productId = req.params.id
        Cart.findOne({ userId , productId }).populate('productId').populate('userId')
        .then ( found => {
            res.status(200).json({ cart: found });
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