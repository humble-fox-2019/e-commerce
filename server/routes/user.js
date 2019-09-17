const router = require('express').Router();
const UserController = require('../controllers/user');

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/cart', UserController.addCart);


module.exports = router;