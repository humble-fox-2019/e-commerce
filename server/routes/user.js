const UserController = require('../controllers/user')
const checkEmail = require('../middlewares/emailDuplicateChecker')
const express = require ('express')
const router = express.Router()

router.get('/',UserController.read)
router.post('/register', checkEmail, UserController.register)
router.post('/login',UserController.login)
router.patch('/:id',UserController.patch)
router.delete('/:id',UserController.delete)

module.exports = router