const Product = require('../models/product')

class ProductController {
  static create(req, res, next) {
    const { productName, image, category, price, stock } = req.body
    Product.create({
      productName, image, category, price, stock
    })
      .then(data => {
        res.status(201).json({
          message: 'Success create new product',
          data: data
        })
      })
      .catch(err => {
        // console.log(err);
        // res.status(400).json({
        //   message : err
        // })
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



}

module.exports = ProductController