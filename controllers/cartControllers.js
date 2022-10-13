const Cart=require('../models/Cart');

const createCart=async (req,res)=>{
    try {
        const cart=await Cart.create(req.body);
        res.status(201).json(cart);
    } catch (err) {
        res.status(400).json(err);
    }
}
const updateCart=async (req,res)=>{
   
    try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
}
const deleteCart=async (req,res)=>{
   
    try {
    let cart= await Cart.deleteOne({"_id":req.params.id});
    if(cart.acknowledged){
        res.status(201).json("Cart deleted Successfully!!");
    }else{
        res.status(400).json("No such Cart was present in the first place!!")
    }
    } catch (err) {
        res.status(500).json(err);
    }

}
const getCart=async (req,res)=>{
    try {
    const cart=await Cart.findOne({userID:req.params.id})
    if(!cart){
        res.status(400).json("User does not have any Cart!")
    }
    // const {password, ...others}=user._doc 
    res.status(201).json(cart);   
    } catch (err) {
        res.status(400).json(err);
    }
}
const getAllCarts=async (req,res)=>{
    try {
        const carts=await Cart.find();
        res.status(201).json(carts);   
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports={createCart,getAllCarts,deleteCart,updateCart,getCart}