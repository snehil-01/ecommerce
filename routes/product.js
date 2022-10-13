const express= require('express');
// const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./middlewares/verifyToken');
const {verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts } = require('../controllers/productControllers');
const router=express.Router();


router.post('/',verifyTokenAndAdmin,createProduct);
/* update*/ router.put('/:id',verifyTokenAndAdmin,updateProduct)
/*delete*/ router.delete('/:id',verifyTokenAndAdmin,deleteProduct)
/*GET PRODUCT*/ router.get('/find/:id',getProduct);

// lh:3500/api/product/?new=true&category="string"
// GET ALL PRODUCTS
router.get('/',getAllProducts);

module.exports=router;