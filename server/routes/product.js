const router = require('express').Router();
const ProductController = require('../controllers/product');
const { authentication } = require('../middlewares/authentication');
const { isAdmin } = require('../middlewares/authorization');
const { multer, sendUploadToGCS } = require('../middlewares/gcs');

router.use(authentication);
router.post('/', isAdmin, multer.single('image'), sendUploadToGCS, ProductController.create);
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.put('/:id', isAdmin, multer.single('image'), sendUploadToGCS, ProductController.update);
router.delete('/:id', isAdmin, multer.single('image'), sendUploadToGCS, ProductController.delete);

module.exports = router;