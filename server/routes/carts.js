const Router = require('express').Router(),
    CartController = require('../controllers/Cart'),
    authentication = require('../middleware/authentication'),
    authorization = require('../middleware/authorization-cart')

Router.post('/', CartController.add)
Router.use(authentication, authorization)
Router.get('/', CartController.read)
Router.put('/', CartController.modify)
Router.delete('/', CartController.destroy)

module.exports = Router;