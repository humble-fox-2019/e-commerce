const router = require('express').Router();
const pet = require('../controllers/pet');
const { multer, getPublicUrl, sendUploadToGCS } = require('../middlewares/image');
const { Authentication, AuthAdmin } = require('../middlewares/authentication');

router.use(Authentication);
router.post('/', AuthAdmin, multer.single('file'), sendUploadToGCS, pet.create);
router.get('/', pet.findAll);
router.delete('/:id', AuthAdmin, pet.delete);

module.exports = router;