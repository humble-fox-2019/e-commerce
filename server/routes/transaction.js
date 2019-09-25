const router = require('express').Router();
const transaction = require('../controllers/transaction');
const { Authentication, AuthOwner, AuthAdmin } = require('../middlewares/authentication');

router.use(Authentication);
router.get('/', transaction.findAll);
router.get('/admin', AuthAdmin, transaction.find);
router.patch('/pay/:id', AuthOwner, transaction.pay);
router.patch('/verified/:id', AuthAdmin, transaction.verified);
router.patch('/recieved/:id', AuthOwner, transaction.recieved);

module.exports = router;