const Router = require('express').Router(),
    ProductController = require('../controllers/Product'),
    authentication = require('../middleware/authentication')

Router.get('/', ProductController.read)
Router.use(authentication)
Router.post('/new', ProductController.create)


module.exports = Router;