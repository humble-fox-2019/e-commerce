const router = require('express').Router();
const UserController = require('../controllers/user');

router.post('/users/signup', UserController.signup);
router.post('/users/signin', UserController.signin);

module.exports = router;