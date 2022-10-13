const Order = require('../models/Order');

const createOrder=async (req,res)=>{
    try {
        const order=await Order.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
}
const updateOrder=async (req,res)=>{
   
    try {
    const updatedOrder = Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
}
const deleteOrder=async (req,res)=>{
   
    try {
    let orders= await Order.deleteOne({"_id":req.params.id});
    if(orders.acknowledged){
        res.status(201).json("order deleted Successfully!!");
    }else{
        res.status(400).json("No such order was present in the first place!!")
    }
    } catch (err) {
        res.status(500).json(err);
    }

}
const getOrder=async (req,res)=>{
    try {
    const order=await Order.findById(req.params.id)
    if(!order){
        res.status(400).json("No Such order exists!")
    }
    // const {password, ...others}=user._doc 
    res.status(201).json(order);   
    } catch (err) {
        res.status(400).json(err);
    }
}
const getAllOrders=async (req,res)=>{
    try {
        const orders=await Order.find();
        res.status(201).json(orders);   
    } catch (err) {
        res.status(400).json(err);
    }
}

const monthlyIncome=async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  }
module.exports={createOrder,updateOrder,deleteOrder,getOrder,getAllOrders,monthlyIncome}