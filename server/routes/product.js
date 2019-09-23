const router = require('express').Router()
const {
    multer,
    sendUploadToGCS
} = require('../middleware/image')
const productController = require('../controller/product')

router.post('/', multer.single('file'), sendUploadToGCS, productController.create)
router.get('/', productController.getAll)
router.delete('/:id', productController.delete)






module.exports = router