const router = require('express').Router();
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const images = require('../helpers/images')

router.post('/category', ProductController.getCategory)
router.post('/create', authentication, authorizeAdmin, images.multer.single("image"), images.sendUploadToGCS, ProductController.create)
router.delete('/:id', authentication, authorizeAdmin, ProductController.destroy)

module.exports = router