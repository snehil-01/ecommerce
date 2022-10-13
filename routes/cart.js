const express= require('express');
const Cart = require('../models/Cart');
// const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./middlewares/verifyToken');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const { createCart, updateCart, deleteCart, getCart, getAllCarts } = require('../controllers/cartControllers');
const router=express.Router();

// CREATE
router.post('/',verifyToken,createCart)

// UPDATE
router.put('/:id',verifyTokenAndAuthorization,updateCart)

// delete

router.delete('/:id',verifyTokenAndAuthorization,deleteCart)

// GET USER PRODUCT
router.get('/find/:id',verifyTokenAndAuthorization,getCart);

// lh:3500/api/product/?new=true&category="string"
// GET ALL CARTS
router.get('/',verifyTokenAndAdmin,getAllCarts);
module.exports=router;