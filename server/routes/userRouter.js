const router = require('express').Router();
const UserController = require('../controllers/userController')

router.post('/create', UserController.create)
// router.post('/login', (req,res)=>{
//     console.log('here');
//     res.send('here')
// })
router.post('/login', UserController.login)


module.exports = router