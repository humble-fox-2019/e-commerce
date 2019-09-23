const express = require('express')
const router = express.Router()
const controller = require('../controllers/product')
const { multer, sendUploadToGCS } = require("../middlewares/image")


router.get('/list', controller.GetAll)
router.post('/create', multer.single('image'), sendUploadToGCS, controller.create)


module.exports = router

