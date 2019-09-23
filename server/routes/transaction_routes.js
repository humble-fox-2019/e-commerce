const express = require('express');
const router = express.Router();
const { transaction_controller } = require('../controllers')
const { Authenthication , AuthorizedAdmin  , AuthorizedUser } = require('../middelware')

router.use(Authenthication)

router.get('/' , AuthorizedAdmin ,  transaction_controller.getTransaction );
router.patch('/:id/admin' , AuthorizedAdmin , transaction_controller.konfirmasiTrx);
router.patch('/:id/user' ,  transaction_controller.konfirmasiUser);
router.get('/user' , transaction_controller.getTrxUser);
router.get('/:id/detail'  , transaction_controller.getOneTrx);


module.exports = router;