const { Product } = require('../models')
const { deleteFromGCS } = require('../middlewares/images')

class ProductController {
  static getAll(req, res, next) {
    Product.find().sort('-createdAt')
      .then(products => {
        res.status(200).json({ products })
      })
      .catch(next)
  }

  static create(req, res, next) {
    const image = req.file ? req.file.cloudStoragePublicUrl : ''
    const { name, description, price, stock } = req.body
    const sellerId = req.decode.id

    // console.log(image)
    // console.log(req.file)
    // console.log(req.body)
    Product.create({ name, description, price, stock, sellerId, image })
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