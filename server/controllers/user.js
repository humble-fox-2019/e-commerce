const User = require('../models/user')
const { generateJWTToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const Product =  require('../models/product')
class UserController {
    static createUser(req, res, next){
        const { username, email, password } = req.body
        User.create({
            username,
            email, 
            password
        })
        .then(user =>{
            res.status(201).json({ username: user.username, email: user.email })
        })
        .catch(next)
    }

    static loginForm(req, res, next){
    
        const { email, password } = req.body
        User.findOne({
            email
        })
        .then(user => {
            if(user && comparePassword(password, user.password)){
           
                
                let payload = {
                    _id: user._id,
                    email: user.email,
                    username: user.username
                }
                let token = generateJWTToken(payload)
                res.status(200).json({ token, username: user.username })
            }
            else if(user){
                next({status: 400, message: "Invalid password"})
            }
            else{
                
                next({status: 400, message: "User does not exist"})
            }
        })
        .catch(next)
    }
    static addToCart(req, res, next){
        let userData = null
        User.findById({
            _id: req.decode._id
        })
        .then(user => {
            userData = user
            return Product.findOne({
                _id: req.params.id
            })
        })
        .then(product => {
            if(product.qty>=1){
                userData.cart.push(product._id)
                return User.update({
                    _id: userData._id
                },{
                    cart: userData.cart              
                })
            }else{
                next({ status: 204, message: "Sorry item is not available right now"})
            }
        })
        .then(_ =>{
            res.status(200).json({ message: 'Successfully added item to cart' })
        })
        .catch(next)
    }
    static getCart(req, res, next){
        User.findById({
            _id: req.decode._id
        }).populate('cart')
        .then(user =>{
            res.status(200).json(user.cart)
        })
        .catch(next)
    }
    static removeCart(req, res, next){
        let userData = null
        User.findById({
            _id: req.decode._id
        })
        .then(user => {
            let promise = []
            user.cart.forEach(el => {
                promise.push(Product.findById({
                    _id: el
                }))
            })
            userData = user
            return Promise.all(promise)
        })
        .then(products =>{
            let promise = []
            products.forEach(product =>{
                product.qty--
                promise.push(Product.update({
                    _id: product._id
                },{
                    qty: product.qty
                }))
            })
            return Promise.all(promise)
        })
        .then(_=>{
            return User.update({
                _id: userData._id
            },{
                cart: []
            })
        })
        .then(_ =>{
            res.status(200).json({ message: 'Successfully delete items in cart' })
        })
        .catch(next)
    }
}

module.exports = UserController