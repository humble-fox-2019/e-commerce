const router = require('express').Router()
const productController = require('../controllers/productController')
const imageUploader = require('../middleware/image')
const storeAuthentication = require('../middleware/storeAuthentication')
const productAuthorization = require('../middleware/productAuthorization')

router.post('/', storeAuthentication, imageUploader.multer.single('image'), imageUploader.sendUploadToGCS, productController.create)
router.get('/', productController.getAll)
router.get('/search', productController.search)
router.get('/featured', productController.getFeatured)
router.get('/myproduct', storeAuthentication, productController.getMyProduct)
router.get('/:id', productController.getOne)
router.put('/:id', storeAuthentication, productAuthorization, imageUploader.multer.single('image'), imageUploader.sendUploadToGCS, productController.updateProduct)
router.delete('/:id', storeAuthentication, productAuthorization, productController.deleteProduct)



module.exports = router
