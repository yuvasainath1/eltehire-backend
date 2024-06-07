const ErrorHander=require('../utils/errorhandler');
const catchAsyncErrors=require('../middlewares/catchAsyncerrors');
const User=require('../models/usermodel');
const sendEmail=require('../utils/sendEmail');
const sendToken=require('../utils/jwtToken');
const crypto = require("crypto");
 
// Register newuser
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const isvalid = await User.findOne({email});
    if(isvalid){
        return next(new ErrorHander("User with this Email already Exist try another", 401));
    }
    const user=await User.create({
           name,
           email,
           password
    });
    sendToken(user, 201, res);
});

// Login existing User
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHander("User with this Email No exist try register", 401));
    }
    const ispasswordmatched=await user.comparePassword(password);
    if(!ispasswordmatched){
        return next(new ErrorHander("Password incorrect ", 401));
    }
    sendToken(user, 200, res);
})

//Get userdetails
exports.getUserdatails=catchAsyncErrors(async(req,res,next)=>{
    // const user=await User.findById(req.user._id);
    res.status(200).json({
        success:true,
        user:req.user,
    })
})


// get all Users
exports.getAllUsers=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users,
    })
})

//get single user
exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
    const id=req.headers.id;
    const user=await User.findById(id);
    if(!user){
        return next(
            new ErrorHander('User Not found',400)
        );
    }
    res.status(200).json({
        success:true,
        user
    })
})

//Update the User datails
exports.updateUser=catchAsyncErrors(async(req,res,next)=>{
    const newdetails={name:req.body.name,
            password:req.body.password
    }
    // const user=await User.findById(req.user.id);
    const user = await User.findByIdAndUpdate(req.user.id, newdetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        user,
      });
})

//Delete User
exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
})

// Forgot password

// Reset password

