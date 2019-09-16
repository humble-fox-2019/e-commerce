const router = require('express').Router()
const userRoutes = require('./userRoutes')
const authentication = require('../middleware/userAuthentication.js')

router.get('/', (req, res, next) => {
    res.json('Hello world')
})
router.use('/user', userRoutes)

module.exports = router


