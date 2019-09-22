const router = require('express').Router();
const cartController = require('../controllers/cartController.js')
const authentication = require('../middlewares/authentication')

router.post('/create', authentication, cartController.create)

module.exports = router