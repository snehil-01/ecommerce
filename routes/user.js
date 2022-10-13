const express= require('express');
const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const router=express.Router();
const bcrypt=require('bcryptjs');
const { updateUser, deleteUser, findByAdmin, findByAdminNew, stats } = require('../controllers/userControllers');


router.put('/:id',verifyTokenAndAuthorization,updateUser);
router.delete('/:id',verifyTokenAndAuthorization,deleteUser);
router.get('/find/:id',verifyTokenAndAdmin,findByAdmin);

// lh:3500/api/user/?new
router.get('/',verifyTokenAndAdmin,findByAdminNew)

// Imp quieries:-
router.get("/stats", verifyTokenAndAdmin,stats);

module.exports=router;