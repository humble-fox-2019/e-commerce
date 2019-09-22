const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const userAuthentication = require('../middleware/userAuthentication')
const isUser = require('../middleware/isUser')
const isStore = require('../middleware/isStore')
const transactionAuthorization = require('../middleware/transactionAuthorization')

router.post('/', userAuthentication, transactionController.create)
router.get('/', isUser, isStore, transactionAuthorization, transactionController.getAll)
// router.patch('/:id', isUser, isStore, transactionAuthorization, transactionController.update)


module.exports = router
