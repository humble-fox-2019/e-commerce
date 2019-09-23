const express = require('express');
const CartController = require('../controllers/cartController');
const router = express.Router();
const authentication = require('../middlewares/authentication');

router.use(authentication);
router.post('/checkout', CartController.checkout);
router.get('/', CartController.getMyCart);
router.post('/', CartController.store);
router.put('/:id', CartController.update);
router.delete('/:id', CartController.delete);

module.exports = router;
