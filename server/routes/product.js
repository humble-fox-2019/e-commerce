const express = require('express')
const router = express.Router()
const images =require('../helpers/images')
const productController = require('../controllers/product')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')
const checker = require('../helpers/imageChecker')

router.get('/', productController.getProducts)
router.get('/:id', productController.getOne)
router.post('/', images.multer.single('image'), checker, 
images.sendUploadToGCS, productController.createProduct)
router.delete('/:id', authentication,authorization, productController.deleteProduct)
router.patch('/:id', authentication, authorization, images.multer.single('image'), checker, 
images.sendUploadToGCS,productController.updateProduct)
// router.patch('update/:id', authentication, images.multer.single('image'), checker, 
// images.sendUploadToGCS,productController.updateProduct)


module.exports = router;