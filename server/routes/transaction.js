const router = require('express').Router();
const TransactionController = require('../controllers/transaction');
const { authentication } = require('../middlewares/authentication');
const { isTransactionOwner } = require('../middlewares/authorization');

router.get('/', authentication, TransactionController.findAll);
router.patch('/:id/pay', authentication, isTransactionOwner, TransactionController.pay);

module.exports = router