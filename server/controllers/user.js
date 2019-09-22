const User = require('../models/user');
const Product = require('../models/product');
const { generateToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const DEFAULT_IMG = 'https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914__340.png';

class UserController {
  static signup(req, res, next) {
    const { name, email, password, role } = req.body;
    const image = req.file ? req.file.publicUrl : DEFAULT_IMG ;
    
    User.create({ name, email, password, role, image })
    .then(user => {
      const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      
      let token = generateToken(payload);
      
      res.status(201).json({ token, payload });
    })
    .catch(next);
  };
  
  static signin(req, res, next) {
    const { email, password } = req.body;
    
    User.findOne({ email })
    .then(user => {
      if (user) {
        if(comparePassword(password, user.password)) {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          };
          
          let token = generateToken(payload);
          res.status(200).json({ token, payload });
        } else {
          res.status(400).json({
            errors: ['Incorrect email or password']
          })
        }
      } else {
        res.status(400).json({
          errors: ['Incorrect email or password']
        })
      }
    })
    .catch(next)
  }
  
  static addCart(req, res, next) {
    const { ProductId, count } = req.body;
    const { _id } = req.decoded;
    
    Product.findOne({ _id: ProductId})
    .then(product => {
      // console.log(product)
      if (product) {
        if (product.stock >= count) {
          product.stock -= count;
          product.save();
          return User.findOneAndUpdate({ _id }, { $push: { cart: { ProductId, count }}}, {new: true, useFindAndModify: false});
        } else {
          next({status: 400, message: 'Product stock is lacking'});
          return false;
        }
      } else {
        // console.log('sdsada')
        next({status: 400, message: 'Product ID is not found'})
        return false;
      }
    })
    .then(user => {
      if (user) {
        res.status(201).json('Added to cart')
      }
    })
    .catch(next)
    
  }
  
  static getCart(req, res, next) {
    const { _id } = req.decoded;
    // console.log(_id)
    User.findById(_id).populate('cart.ProductId').lean(true)
    .then(user => {
      let carts = [];
      // console.log(user.cart)
      
      user.cart.forEach(cart => {
        cart.subtotal = cart.ProductId.price * cart.count
        carts.push(cart);
      });
      res.status(200).json(carts);
    })
    .catch(next);
  }
  
  static deleteCart(req, res, next) {
    const cartId = req.params.id;
    const {_id} = req.decoded;
    let ProductId = null;
    let count = 0;

    User.findById(_id).lean(true)
      .then(user => {
        user.cart.forEach(cartItem => {
          if (cartItem._id.equals(cartId)) {
            ProductId = cartItem.ProductId
            count = cartItem.count;
          }
        })
        return Product.findById(ProductId)
      })
        .then(product => {
          product.stock += count;
          product.save();
          return User.updateOne({ _id }, { '$pull': { cart: { _id : cartId } } });
        })
        .then(() => {
          res.status(200).json('Cart deleted');
        })
        .catch(next)
    }
    
    static updateCart(req, res, next) {
      
    }
  }
  
  module.exports = UserController;