const express = require('express');
const router = express.Router();
const { product_controller } = require('../controllers')
const upload = require('../middelware/gcs')
const { Authenthication ,  AuthorizedAdmin } = require('../middelware')

router.use(Authenthication)
router.get('/' ,  product_controller.getProduct )
router.get('/:id' , product_controller.getOneProduct)
router.use(AuthorizedAdmin)
router.post('/' , upload.multer.single('image'), upload.sendUploadToGCS, upload.validate_format ,    product_controller.addProduct )
router.put('/:id'   , upload.deleteForEdit ,   product_controller.editProduct  )
router.delete('/:id' ,  upload.deleteFile , product_controller.deleteProduct )

module.exports = router;