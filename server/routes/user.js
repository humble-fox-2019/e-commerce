const router = require('express').Router();
const user = require('../controllers/user');

router.post('/register', user.create);
router.post('/admin', user.adminLogin);
router.post('/login', user.login);

module.exports = router;