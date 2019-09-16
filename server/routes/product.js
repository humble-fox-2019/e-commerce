'use strict'

const router = require('express').Router()
const { ProductController } = require('../controllers')
// const { authorization } = require('../middlewares/authorization')
// const { multer, sendUploadToGCS } = require('../middlewares/gcs')

router.get('/', ProductController.findAll)
router.post('/', ProductController.create)
// router.post('/search', ArticleController.search)
router.patch('/:id', ProductController.edit)
router.delete('/:id', ProductController.remove)

module.exports = router

// multer.single('image'), sendUploadToGCS,
