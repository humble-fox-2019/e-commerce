const ProductController = require('../controllers/product')
const { multer, sendUploadToGCS } = require('../middlewares/multer')
const authenticate = require('../middlewares/authenticate')
const authorizeAdmin = require('../middlewares/authorizeAdmin')

const router = require('express').Router()

router.get('/', ProductController.getAll)
router.get('/brand/:brand', ProductController.getBrand)
router.put('/:id', authenticate, authorizeAdmin, multer.single('image'), sendUploadToGCS, ProductController.updateItem)
router.post('/', authenticate, authorizeAdmin, multer.single('image'), sendUploadToGCS, ProductController.registerProduct)
router.delete('/:id', authenticate, authorizeAdmin, ProductController.remove)

module.exports = router