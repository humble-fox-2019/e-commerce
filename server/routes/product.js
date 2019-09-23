const ProductController = require ('../controllers/product')
const express = require ('express')
const router = express.Router()

router.get('/',ProductController.read)
router.post('/',ProductController.create)
router.patch('/',ProductController.patch)
router.delete('/',ProductController.delete)

module.exports = router