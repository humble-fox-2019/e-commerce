const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const userAuthentication = require('../middleware/userAuthentication')
const storeAuthentication = require('../middleware/storeAuthentication')
const isUser = require('../middleware/isUser')
const isStore = require('../middleware/isStore')
const transactionAuthentication = require('../middleware/transactionAuthentication')
const stTrAuthor = require('../middleware/stTrAuthor')
const userTrAuthor = require('../middleware/userTrAuthor')

router.post('/', userAuthentication, transactionController.create)
router.get('/', isUser, isStore, transactionAuthentication, transactionController.getAll)
router.patch('/confirm/:id', storeAuthentication, stTrAuthor, transactionController.confirm)
router.patch('/completed/:id', userAuthentication, userTrAuthor, transactionController.completed)


module.exports = router
