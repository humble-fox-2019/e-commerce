const express = require('express');
const router = express.Router();
const { auth_controller } = require('../controllers')
const { Authenthication } = require('../middelware') 

router.post('/register' ,  auth_controller.Register )
router.post('/login' ,  auth_controller.Login )
router.post('/checkadmin' , Authenthication , auth_controller.checkAdmin)

module.exports = router
