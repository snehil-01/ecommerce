const Product = require('../models/Product');

const createProduct=async (req,res)=>{
    try {
        const product=await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json(err);
    }
}
const updateProduct=async (req,res)=>{
   
    try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}
const deleteProduct=async (req,res)=>{
   
    try {
    let products= await Product.deleteOne({"_id":req.params.id});
    if(products.acknowledged){
        res.status(201).json("Product deleted Successfully!!");
    }else{
        res.status(400).json("No such product was present in the first place!!")
    }
    } catch (err) {
        res.status(500).json(err);
    }

}
const getProduct=async (req,res)=>{
    try {
    const product=await Product.findById(req.params.id)
    if(!product){
        res.status(400).json("No Such product exists!")
    }
    // const {password, ...others}=user._doc 
    res.status(201).json(product);   
    } catch (err) {
        res.status(400).json(err);
    }
}
const getAllProducts=async (req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category;
    // console.log(query);
    try {
        let products;
        if(qNew){
             products=await Product.find().sort({createdAt:-1}).limit(2);
            res.status(201).json(products)
        }else if(qCategory){
             products=await Product.find({
                categories:{
                    $in:[qCategory]
                }
            })
            res.status(201).json(products)
        }else{
            products=await Product.find();
            res.status(201).json(products)
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports={createProduct,updateProduct,deleteProduct,getProduct,getAllProducts}