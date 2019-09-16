const router = require('express').Router();

const UserController = require('../controllers/userController');

router.get('/', (req, res, next) => {
    res.status(200).json({
        "code": 200,
        "message": 'ok'
    });
});

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);

router.get('/*', (req, res, next) => {
    next({ statusCode: 404, msg: 'Route not found' });
});

module.exports = router
