const router = require('express').Router()
const userAuthentication = require('../middleware/userAuthentication')
const cartAuthorization = require('../middleware/cartAuthorization')
const verifyIdProduct = require('../middleware/verifyIdProduct')
const cartChecker = require('../middleware/cartChecker')
const cartController = require('../controllers/cartController')

router.use('/', userAuthentication)
router.post('/', verifyIdProduct, cartChecker, cartController.create)
router.get('/', cartController.getAll)
router.patch('/add-quantity/:id', cartAuthorization, verifyIdProduct, cartController.addQuantity)
router.patch('/minus-quantity/:id', cartAuthorization, verifyIdProduct, cartController.minusQuantity)
router.delete('/:id', cartAuthorization, cartController.remove)


module.exports = router
