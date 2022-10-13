const express= require('express');
// const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./middlewares/verifyToken');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const { createOrder, updateOrder, deleteOrder, getAllOrders, getOrder, monthlyIncome } = require('../controllers/order.controleers');
const router=express.Router();

// CREATE
router.post('/',verifyToken,createOrder)

// UPDATE
router.put('/:id',verifyTokenAndAuthorization,updateOrder)

// delete

router.delete('/:id',verifyTokenAndAuthorization,deleteOrder)

// GET USER Order
router.get('/find/:id',verifyTokenAndAuthorization,getOrder);

// lh:3500/api/product/?new=true&category="string"
// GET ALL orders
router.get('/',verifyTokenAndAdmin,getAllOrders)

router.get("/income", verifyTokenAndAdmin, monthlyIncome);
module.exports=router;