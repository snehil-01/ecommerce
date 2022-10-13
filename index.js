const express=require("express");
const app=express();
const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const userRoute=require('./routes/user');
const authRoute=require('./routes/auth');
const productRoute=require('./routes/product');
const orderRoute=require('./routes/order');
const cartRoute=require('./routes/cart');
const port=process.env.PORT_COUSTOM || 3500;

const connectDB=require('./config/db');
connectDB();

app.use(express.json());

const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
/*
middleware (req,res,next)
app.use(path,middleware)
*/

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/product',productRoute);
app.use('/api/orders',orderRoute);
app.use('/api/carts',cartRoute);

console.log(process.env.SNEHIL)
app.listen(port,()=>{
    console.log(`server is fired succesfully on ${port} port`);
})