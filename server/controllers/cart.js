const { Cart, Product } = require('../models')

class CartController {
  static delete(req, res, next) {
    const { id } = req.params

    Cart.findById(id)
      .then(cart => {
        const promises = []

        cart.items.forEach(el => {
          promises.push(Product.findByIdAndUpdate(el.productId, { $inc: { stock: el.qty } }))
        })

        return Promise.all(promises)
      })
      .then(() => {
        return Cart.findByIdAndDelete(id)
      })
      .then(cart => {
        console.log(cart)
        res.status(200).json({ cart })
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    const userId = req.decode.id
    Cart.findOne({ userId, status: false })
      .then(cart => {
        console.log(cart)
        if (cart) {
          return cart
        } else {
          return Cart.create({ userId })
        }
      })
      .then(cart => {
        res.status(200).json({ cart })
      })
      .catch(next)
  }

  static getOnePop(req, res, next) {
    const userId = req.decode.id
    Cart.findOne({ userId, status: false }).populate('items.productId')
      .then(cart => {
        if (cart) return cart
        else {
          return Cart.create({ userId })
        }
      })
      .then(cart => {
        res.status(200).json({ cart })
      })
      .catch(next)
  }

  static addProducts(req, res, next) {
    const userId = req.decode.id
    const { productId, qty } = req.body


    Cart.findOne({ userId, status: false })
      .then(cart => {
        if (cart) {
          return cart
        } else {
          return Cart.create({ userId })
        }
      })
      .then(cart => {
        const found = cart.items.filter((el, i) => {
          return el.productId == productId
        })

        if (found.length > 0) {
          for (let i = 0; i < cart.items.length; i++) {
            if (cart.items[i].productId == productId) {
              cart.items[i].qty += qty
              break
            }
          }
        } else {
          cart.items.push({ productId, qty })
        }

        const promises = []
        promises.push(Cart.findByIdAndUpdate(cart._id, cart, { new: true }))
        promises.push(Product.findByIdAndUpdate(productId, { $inc: { stock: -qty } }))
        return Promise.all(promises)
        // cart.save()
      })
      .then(result => {
        const cart = result[0]
        res.status(200).json({ cart })
      })
      .catch(next)
  }

  static removeProducts(req, res, next) {
    const userId = req.decode.id
    const productId = req.params.id
    Cart.findOne({ userId, status: false })
      .then(cart => {
        let removed
        for (let i = 0; i < cart.items.length; i++) {
          if (cart.items[i].productId == productId) {
            removed = cart.items.splice(i, 1)
            break
          }
        }
        // console.log(removed[0].productId)
        const promises = []
        promises.push(Cart.findByIdAndUpdate(cart._id, cart, { new: true }))
        promises.push(Product.findByIdAndUpdate(removed[0].productId, { $inc: { stock: removed[0].qty } }))
        return Promise.all(promises)
      })
      .then(result => {
        const cart = result[0]
        console.log(cart)
        res.status(200).json({ cart })
      })
      .catch(next)

  }

  static updateProgress(req, res, next) {
    const { id } = req.params

    const update = {}
    for (let key in req.body) {
      update[key] = req.body[key]
    }
    console.log(update)

    Cart.findByIdAndUpdate(id, update)
      .then(cart => {
        console.log(cart)
        res.status(200).json({ cart })
      })
      .catch(next)
  }

  static getOnProgress(req, res, next) {
    Cart.find({ onProgress: true })
      .then(carts => {
        console.log(carts)
        res.status(200).json({ carts })
      })
      .catch(next)
  }

  static history(req, res, next) {
    const userId = req.decode.id
    Cart.find({ userId, status: true })
      .then(carts => {
        console.log(carts)
        res.status(200).json({ carts })
      })
      .catch(next)
  }
}

module.exports = CartController