const express = require('express')
const router = express.Router()
const controller = require('../controllers/cart')


//router.post('/create', controller.create)
router.get('/getone', controller.getOne)



module.exports = router

