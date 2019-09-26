const router = require('express').Router()
const userController = require('../controllers/userController')
const userAuthentication = require('../middleware/userAuthentication')

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)
router.get('/get-user-data', userAuthentication, userController.getUserData)


module.exports = router

