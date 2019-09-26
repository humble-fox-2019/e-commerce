const router = require('express').Router()
const storeController = require('../controllers/storeController')
const storeAuthentication = require('../middleware/storeAuthentication')

router.post('/signup', storeController.signup)
router.post('/signin', storeController.signin)
router.get('/get-store-data', storeAuthentication, storeController.getStoreData)


module.exports = router
