const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transaction')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/', authentication, transactionsController.createTransaction)
router.patch('/:id', authentication, transactionsController.updateTransaction)
router.get('/one', authentication, transactionsController.getTransactionOne)
router.get('/', authentication, authorization, transactionsController.getTransactions)

module.exports = router