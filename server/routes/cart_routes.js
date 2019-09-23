const express = require('express');
const router = express.Router();
const { cart_controller } = require('../controllers')
const { Authenthication } = require('../middelware')

router.use(Authenthication)

router.get('/' , cart_controller.getCart)
router.post('/' ,  cart_controller.addCart )
router.post('/checkout'  , cart_controller.CheckOut)
router.patch('/:id' , cart_controller.editQty)
router.delete('/:id' ,  cart_controller.deleteCart)

module.exports = router;