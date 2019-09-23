const express = require('express');
const router = express.Router();
const { voucher_controller } = require('../controllers')
const { Authenthication , AuthorizedAdmin } = require('../middelware')

router.use(Authenthication)
router.use(AuthorizedAdmin)

router.get('/user'  ,voucher_controller.getAllUser)


module.exports = router
