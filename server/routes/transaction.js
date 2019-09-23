const express = require('express');
const router = express.Router()
const TransactionController = require('../controllers/transaction')
const authentication = require('../middleware/authentication');
const { adminAuthorization , customerAuthorization } = require('../middleware/authorization');


router.use( authentication )

// Get all transaction history [Admin]
router.get('/' , adminAuthorization , TransactionController.getAll )

// Create new Transaction [ Customer ]
router.post('/' , customerAuthorization , TransactionController.create )

// Get all transaction history by userId [customer]
router.get('/:id' , customerAuthorization , TransactionController.getAllByUserId )

// Update Status [ Admin and Customer ] Transaction ID 
router.patch('/:id' , TransactionController.updateStatus )



module.exports = router