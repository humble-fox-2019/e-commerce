const router = require('express').Router();
const user = require('./user');
const pet = require('./pet');
const cart = require('./cart');
const transaction = require('./transaction');

router.use('/transactions', transaction);
router.use('/users', user);
router.use('/pets', pet);
router.use('/cart', cart);

module.exports = router;