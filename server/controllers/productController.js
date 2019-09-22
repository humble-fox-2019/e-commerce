const Product = require('../models/product')

class ProductController {
  static create(req, res, next) {
    const { productName, image, category, price, stock, description } = req.body
    console.log(req.body);
    Product.create({
      productName, image, category, description, price, stock
    })
      .then(data => {
        console.log(data ,'<<<<<<');
        res.status(201).json({
          message: 'Success create new product',
          data: data
        })
      })
      .catch(err => {
        res.status(400).json({
          message : err
        })
        next({
          status: 400,
          err: err
        })
      })
  }
  static destroy(req, res, next) {
    let {
      id
    } = req.params
    Product.findByIdAndDelete(id)
      .then(data => {
        res.status(200).json({
          message :  `Success deleted`,
          data : data
        })
      }).catch(err => {
        res.status(404)
        next(err)
      })
  }
  static getOne(req, res, next) {
    let {
      id
    } = req.params
    Product.findById(id)
      .then(data => {
        res.status(200).json({
          data
        })
      }).catch(err => {
        res.status(404)
        next(err)
      })
  }
  static getCategory(req, res, next){
    const {category} = req.body
    // console.log(req.body);
    Product.find({category})
    .then(data => {
      res.status(200).json({
        data
      })
    })
    .catch(err=>{
      console.log(err , '<<<<');
      next(err)
    })
  }
}

module.exports = ProductController