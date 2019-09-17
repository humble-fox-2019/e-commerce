const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin');
const gcs = require('../helpers/gcs');

router.use(authentication);
router.get('/', ProductController.findAll);
router.post('/', isAdmin, gcs.multer.single('image'), gcs.sendUploadToGCS, ProductController.store);

router.get('/:id', ProductController.findOne);
router.patch('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;
