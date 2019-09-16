const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const productCheck = require('../middlewares/productCheck');

router.use(authentication);
router.get('/', ProductController.findAll);
router.post('/', ProductController.store);

router.use("/:id", productCheck);

router.get('/:id', ProductController.findOne);
router.patch('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;
