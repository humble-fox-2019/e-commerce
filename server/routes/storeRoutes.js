const router = require('express').Router()
const storeController = require('../controllers/storeController')

router.post('/signup', storeController.signup)
router.post('/signin', storeController.signin)


module.exports = router
