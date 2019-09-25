const router = require('express').Router();
const pet = require('../controllers/pet');
const { multer, getPublicUrl, sendUploadToGCS } = require('../middlewares/image');
const { Authentication, AuthAdmin } = require('../middlewares/authentication');

router.use(Authentication);
router.get('/', pet.findAll);
router.post('/', AuthAdmin, multer.single('file'), sendUploadToGCS, pet.create);
router.delete('/:id', AuthAdmin, pet.delete);

module.exports = router;