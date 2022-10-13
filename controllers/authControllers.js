const asyncHandler = require('express-async-handler')
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const localStorage=require('localStorage');

const getUsers=asyncHandler(async (req,res)=>{
    const users=await User.find({},'-password');
    if(!users){
        res.status(400);
        throw new Error("No users in the DB");
    }
    res.status(201).json(users);
});

const registerUser=asyncHandler( async (req,res)=>{
    let username=req.body.username
    let email=req.body.email
    var password=req.body.password
    let phone=req.body.phone

    if(!username || !email  || !password){
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    const userExists=await User.findOne({email:email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    const temp=password;
    const salt=await bcrypt.genSalt(10);
    password=await bcrypt.hash(password,salt);

    const user=await User.create({
        username,
        email,
        password,
        phone
    });

    

    let mailTransporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"visputesnehil2002@gmail.com",
            pass:"regptbeisakulffw"
        }
    })

    let details={
        from:"visputesnehil2002@gmail.com",
        to:`${email}`,
        subject:"testing our node mailer",
        text:"Thank You for registering with Snehil's Ecommerce!!"
    }
   
    mailTransporter.sendMail(details,(err)=>{
        // console.log(err);
        if(err){
            console.log(err);
        }else{
            console.log("mail sent!!");
        }
    })

    // user=User.findOne({email})
   console.log( await bcrypt.compare(temp,password));
    if(user){
        res.status(201).json(user)
    }
})

const loginUser=asyncHandler(async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const user=await User.findOne({username});
    if(!user){
        res.status(400);
        throw new Error("Oppss!! No User Exists");
    }
    const hashedPassword=user.password;
    if(! await bcrypt.compare(password,hashedPassword)){
        res.status(400);
        throw new Error("Invalid Username or Password!!");
    }

    const token=jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin
    },
    process.env.JWT_SECRET_KEY
    ,{
        expiresIn:"3d"
    })
    localStorage.setItem("token",token);
    res.status(201).json({user,token})
})

module.exports={getUsers,registerUser,loginUser};