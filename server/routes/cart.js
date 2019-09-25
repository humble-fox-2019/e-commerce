const router = require('express').Router();
const cart = require('../controllers/cart');
const { Authentication } = require('../middlewares/authentication');

router.use(Authentication);
router.patch('/checkout/:id', cart.checkout);
router.patch('/add/:id', cart.setIn);
router.patch('/remove/:id', cart.setOut);
router.get('/', cart.readOne);

module.exports = router;