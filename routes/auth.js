const router=require('express').Router();
const {getUsers, registerUser, loginUser}=require('../controllers/authControllers');

router.get('/',getUsers);
router.post('/register',registerUser);
router.post('/login',loginUser);

module.exports=router;