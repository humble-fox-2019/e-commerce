const Router = require('express').Router(),
    ProductController = require('../controllers/Product'),
    authentication = require('../middleware/authentication'),
    authorization = require('../middleware/authorization-product')

Router.get('/', ProductController.read)

Router.use(authentication, authorization)
Router.post('/', ProductController.create)
Router.put('/:id', ProductController.update)
Router.delete('/:id', ProductController.delete)

module.exports = Router;