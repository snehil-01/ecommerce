const mongoose=require("mongoose");

const connectDB= async()=>{
    try {
    const connection=await mongoose.connect(process.env.MONGO_URI_ECO);
    console.log("mongoose connected successfully!!")
    } catch (err) {
        console.log(err);
    }  
}

module.exports=connectDB;