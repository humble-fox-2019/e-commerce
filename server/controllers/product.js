const Product = require('../models/product');
const Cart = require('../models/cart');
const { deleteFile } = require('../helpers/image')


class ProductController {
    static getAll ( req , res , next ) {
        Product.find()
        .then( products => {
            res.status(200).json( products );
        })
        .catch( next );
    }
    static create( req, res ,next ) {
        let imageURL;
        if ( req.file )
            imageURL = req.file.url

        const { name , price , stock , category } = req.body
        
        Product.create({ name, price, stock, imageURL , category })
        .then( createdProduct => {
            res.status(201).json( createdProduct );
        })
        .catch( next );
    }
    static update( req, res ,next ){
        // harus kasi kalo update baru diupload k gcp dl trs delete yang sblmnya
        const productId = req.params.id;
        let imageURL;
        if ( req.file ){
            imageURL = req.file.url
        }
        let { name , price , stock , category } = req.body;

        let product = { name,price, stock, category }

        if ( imageURL ) {
            product = { name,price, stock, category , imageURL }
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