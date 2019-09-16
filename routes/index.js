const router = require('express').Router();

const UserController = require('../controllers/userController');

router.get('/', (req, res, next) => {
    res.status(200).json({
        "code": 200,
        "message": 'ok'
    });
});

router.post('/registration', UserController.signup);
router.post('/signin', UserController.signin);

router.get('/*', (req, res, next) => {
    next({ statusCode: 404, msg: 'Route not found' });
});

module.exports = router
