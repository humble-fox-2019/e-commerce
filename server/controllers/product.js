const Product = require ('../models/product')

class ProductController {

    static create(req,res,next){
        Product.create({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            stock : req.body.stock,
            image : req.body.image
        })
        .then((product)=>{
            console.log (`${product} is created`);
            res.status(200).json({
                product
            })
        })
        .catch(next)
    }

    static read(req,res,next){
        Product.find().then((products)=>{
            res.status(200).json({
                products
            })
        }).catch(next)
    }

    static patch(req,res,next){
        const updatedProduct = {
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            stock : req.body.stock,
            image : req.body.image
        }
        const options = {
            new : true,
            omitUndefined : false
        }
        Product.findByIdAndUpdate({ _id : req.params.id }, updatedProduct, options)
        .then((product)=>{
            res.status(200).json({
                product
            })
        })
        .catch(next)
    }

    static delete(req,res,next){
        Product.findByIdAndDelete({ _id : req.params.id })
        .then(()=>{
            res.status(200).json({
                message : "product deleted"
            })
        })
        .catch(next)
    }

}

module.exports = ProductController