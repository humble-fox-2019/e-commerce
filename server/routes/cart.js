const router = require('express').Router()
const { CartController } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', CartController.getOne)
router.get('/populate', CartController.getOnePop)
router.get('/on-progress', CartController.getOnProgress)
router.get('/history', CartController.history)
router.patch('/add-to-cart', CartController.addProducts)
router.patch('/remove-from-cart/:id', CartController.removeProducts)
router.patch('/progress/:id', CartController.updateProgress)
router.delete('/:id', CartController.delete)

module.exports = router