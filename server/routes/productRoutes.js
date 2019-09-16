const router = require('express').Router()
const productController = require('../controllers/productController')
const imageUploader = require('../middleware/image')
const storeAuthentication = require('../middleware/storeAuthentication')


router.post('/', storeAuthentication, imageUploader.multer.single('image'), imageUploader.sendUploadToGCS, productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)



module.exports = router
