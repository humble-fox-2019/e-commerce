const express = require('express')
const ShoppingCartController = require('../controllers/shoppingCart')
const tokenVerification = require('../middlewares/tokenVerification')
const router = express.Router()
router.use(tokenVerification)

//get shoping cart of the user with specific ID
router.get('/', ShoppingCartController.find)
router.post('/', ShoppingCartController.create)
router.post('/addItem', ShoppingCartController.addItem)
router.delete('/', ShoppingCartController.delete)

module.exports = router