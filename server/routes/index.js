const router = require('express').Router()
const userRouter = require('./user')

router.get('/', (req, res) => console.log('Hello world!'))
router.use('/users', userRouter)

module.exports = router