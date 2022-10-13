const bcrypt=require('bcryptjs');
const User = require('../models/User');

const updateUser= async (req,res)=>{
   if(req.body.password){
    const salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(password,salt);
   }
   
    try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}
const deleteUser=async (req,res)=>{
   
    try {
    let users= await User.deleteOne({"_id":req.params.id});
    if(users.acknowledged){
        res.status(201).json("User deleted Successfully!!");
    }else{
        res.status(400).json("No such user was present in the first place!!")
    }
    } catch (err) {
        res.status(500).json(err);
    }

}

const findByAdmin=async (req,res)=>{
    try {
    const user=await User.findById(req.params.id)
    if(!user){
        res.status(400).json("No Such user exists!")
    }
    const {password, ...others}=user._doc 
    res.status(201).json(others);   
    } catch (err) {
        res.status(400).json(err);
    }
}

const findByAdminNew=async (req,res)=>{
    const query=req.query.new;
    console.log(query);
    try {
        const users= query ?
        await User.find().sort({_id:-1}).limit(2)
        :await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

const stats=async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports={updateUser,deleteUser,findByAdmin,findByAdminNew,stats}