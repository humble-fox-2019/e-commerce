const express = require('express');
const ProductController = require('../controllers/product');
const authentication = require('../middleware/authentication');
const { adminAuthorization , customerAuthorization , productOwner , checkStock } = require('../middleware/authorization')
const image = require('../helpers/image')

const router = express.Router();

router.get('/' , ProductController.getAll );

// To Access all this routes need token!
router.use( authentication )


// Only user with role ADMIN can use this feature [CREATE , UPDATE , DELETE ] PRODUCT
router.post  ('/'    , adminAuthorization, image.multer.single('file'), image.sendUploadToGCS , ProductController.create );
router.put   ('/:id' , adminAuthorization, image.multer.single('file'), image.sendUploadToGCS , ProductController.update );
router.delete('/:id' , adminAuthorization, ProductController.delete );


// User With role CUSTOMER [ADD TO CART, REMOVE FROM CART]
router.use( customerAuthorization );
router.get('/cart' , ProductController.getUserCart );
router.post ('/cart' , ProductController.addToCart );

// params id -> id itu adalah cart id 
router.use( '/cart/:id' ,  productOwner )
router.patch('/cart/:id' , checkStock , ProductController.updateCartQuantity );
router.delete('/cart/:id' , ProductController.deleteProductCart )
module.exports = router;