const { product } = require('../models')
class productController {
    static getProduct (req,res){
        product.find()
        .then(product=>{
            res.status(200).json(product)
        })
        .catch(err=>{
            res.status(500).json({
                message : 'error'
            })
            console.log(err)
        })
       
    }
    
    static addProduct (req,res,next){
        const image = req.file ? req.file.cloudStoragePublicUrl : ''
        let { name , price , stock} = req.body
        product.create({
            name , price, stock , image
        })
        .then(product=>{
            console.log(product)
            res.status(201).json(product)
        })
        .catch(err=>{
            next(err)
        })
    }

    static editProduct (req,res){
        let { name  , price } = req.body
        product.updateOne({
            _id : req.params.id
        },{
            name , price
        })
        .then(product=>{
            res.status(200).json(product)
        })
        .catch(err=>{
            res.status(500).json({
                message : 'error'
            })
            console.log(err)
        })
    }

    static deleteProduct(req,res){
        product.deleteOne({
            _id : req.params.id
        })
        .then(product=>{
            res.status(200).json(product)
        })
        .catch(err=>{
            res.status(500).json({
                message : 'error'
            })
            console.log(err)
        })
    }

    static getOneProduct(req,res){
        product.findById(req.params.id)
        .then((data)=>{
            console.log(data.stock , ' ini')
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = productController