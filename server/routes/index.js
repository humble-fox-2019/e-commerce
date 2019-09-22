const router = require('express').Router();
const userRouter = require('./user');
const productRouter = require('./product');
const transactionRouter = require('./transaction');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'connected'
    })
});

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/transactions', transactionRouter);

module.exports = router;