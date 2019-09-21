const router = require('express').Router();

const UserController = require('../controllers/userController');
const ProductRoute = require('./productRoute');
const CartRoute = require('./cartRoute');
const gcs = require('../helpers/gcs');

router.get('/', (req, res, next) => {
    res.status(200).json({
        "code": 200,
        "message": 'ok'
    });
});

router.post('/registration', gcs.multer.single('image'), gcs.sendUploadToGCS, UserController.registration);
router.post('/login', UserController.login);

router.use('/products', ProductRoute);
router.use('/cart', CartRoute);

router.get('/*', (req, res, next) => {
    next({ statusCode: 404, msg: 'Route not found' });
});

module.exports = router
