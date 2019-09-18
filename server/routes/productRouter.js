const router = require('express').Router();
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorizeAdmin')

router.post('/create', authentication, authorizeAdmin, ProductController.create)
router.delete('/:id', authentication, authorizeAdmin, ProductController.destroy)

module.exports = router