const router = require('express').Router()
const { CartController } = require('../controllers')

router.post('/', CartController.create)

module.exports = router