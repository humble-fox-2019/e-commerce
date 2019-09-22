const router = require('express').Router()
const { ProductController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const images = require('../middlewares/images')

// images.multer.single('image'), images.sendUploadToGCS, 

router.use(authentication)
router.get('/', ProductController.getAll)
router.post('/', images.multer.single('image'), images.sendUploadToGCS, ProductController.create)
router.get('/:id', ProductController.getOne)

router.use('/:id', authorization)
router.patch('/:id', images.multer.single('image'), images.sendUploadToGCS, ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router