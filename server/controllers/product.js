const { Product } = require('../models')

class ProductController {
  static getAll(req, res, next) {
    Product.find()
      .then(products => {
        res.status(200).json({ products })
      })
      .catch(next)
  }

  static create(req, res, next) {
    const { name, stock } = req.body
    const sellerId = req.decode.id
    Product.create({ name, stock, sellerId })
      .then(product => {
        res.status(201).json({ product })
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    const { id } = req.params
    Product.findById(id)
      .then(product => {
        res.status(200).json({ product })
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { id } = req.params
    const { name, stock } = req.body
    Product.findByIdAndUpdate(id, { name, stock })
      .then(product => {
        res.status(200).json({ product })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const { id } = req.params
    Product.findByIdAndDelete(id)
      .then(product => {
        res.status(200).json({ product })
      })
      .catch(next)
  }
}

module.exports = ProductController