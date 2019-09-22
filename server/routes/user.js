const UserController = require('../controllers/user');
const router = require('express').Router();
const authenticate = require('../middlewares/authenticate')
router.post('/register', UserController.createUser)
router.post('/loginform', UserController.loginForm)
router.patch('/cart/:id', authenticate, UserController.addToCart)
router.get('/cart', authenticate, UserController.getCart)
router.delete('/cart', authenticate, UserController.removeCart)

module.exports = router