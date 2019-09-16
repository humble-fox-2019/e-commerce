'use strict'

const { Product } = require('../models')

class ProductController {
  static create (req, res, next) {
    const newProduct = {
      name: req.body.name,
      price: +req.body.price,
      quantity: +req.body.quantity,
      description: req.body.description || 'No description'
    }
    if (req.file) {
      newProduct.imageName = req.file.cloudStorageObject
      newProduct.imageUrl = req.file.cloudStoragePublicUrl
    }
    Product.create(newProduct)
      .then((product) => {
        console.log('New product successfully created')
        res.status(201).json(product)
      }).catch(next)
  }

  static findAll (req, res, next) {
    console.log('Successfully read all products')
    Product.find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static edit (req, res, next) {
    const id = req.params.id
    const input = req.body
    const update = {}
    for (const keys in input) {
      update[keys] = req.body[keys]
    }
    Product.findByIdAndUpdate(id,
      { $set: update },
      { new: true })
      .then((result) => {
        res.status(200).json({ message: 'Product successfully updated', result })
      })
      .catch(next)
  }

  static remove (req, res, next) {
    const productId = req.params.id
    Product.findByIdAndDelete(productId)
      .then(deletedProduct => {
        res.status(200).json({ message: 'Product successfully deleted', deletedProduct })
      })
      .catch(next)
  }
}

module.exports = ProductController
