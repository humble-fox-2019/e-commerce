const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin');
const gcs = require('../helpers/gcs');

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);

router.use(authentication);
router.post('/', isAdmin, gcs.multer.single('image'), gcs.sendUploadToGCS, ProductController.store);

router.patch('/:id', isAdmin, gcs.multer.single('image'), gcs.sendUploadToGCS, ProductController.update);
router.delete('/:id', isAdmin, ProductController.delete);

module.exports = router;
