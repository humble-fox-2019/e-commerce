const express = require('express');
const CartController = require('../controllers/cartController');
const router = express.Router();

router.get('/', CartController.findAll);
router.post('/', CartController.store);

router.get('/:id', CartController.findOne);
router.patch('/:id', CartController.update);
router.delete('/:id', CartController.delete);

module.exports = router;
