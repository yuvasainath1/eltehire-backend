const ErrorHander=require('../utils/errorhandler');
const catchAsyncErrors=require('../middlewares/catchAsyncerrors');
const Admin=require('../models/Adminmodel');
const Work= require('../models/workmodel');

// create a new once
exports.createNew=catchAsyncErrors(async(req,res,next)=>{
     const {Role,description,salary,location,logo}=req.body;
     const _id=req.admin.id;
     const work = await Work.create({
        Role,
        description,
        company:req.admin.company,
        salary,
        location,
        logo,
        admin:_id,
     });
     res.status(200).json({
        success:true,
        work,
     })
})

// update the exisiting once

exports.update=catchAsyncErrors(async(req,res,next)=>{
    const {Role,description,salary,location,logo,id}=req.body;
    const updateddata={
        Role,
        description,
        salary,
        location,
        logo,
    }
    const isvalid= await Work.findById(id);
    if(!isvalid){
        return next(new ErrorHander("work Not found", 401));
    }
    if(!req.admin._id.equals(isvalid.admin)){
        return next(new ErrorHander("Your are not allowed to update this..!!", 401));
    }
    const work = await Work.findByIdAndUpdate(id, updateddata, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    console.log(work);
    res.status(200).json({
        success: true,
        work,
    });
})

// show all my work's uploaded

exports.myworks=catchAsyncErrors(async(req,res,next)=>{
    const works=await Work.find({admin:req.admin._id});
    res.status(200).json({
        success:true,
        message:"Your data",
        works,
    })
})

// show total details
exports.details=catchAsyncErrors(async(req,res,next)=>{
    const id=req.headers.id;
    console.log(id);
    const isvalid=await Work.findById(id);
    console.log(isvalid);
    if(!isvalid){
        return next(new ErrorHander("Work not found", 401));
    }
    res.status(200).json({
        success:true,
        message:"Found data",
        work:isvalid,
    })
})

// delete the existing once

exports.deletework=catchAsyncErrors(async(req,res,next)=>{
    const _id=req.headers.id;
    const isvalid = await Work.findOne({ _id: _id });
    if(!isvalid){
        return next(new ErrorHander("Work not found", 401));
    }
    if(req.headers.admin!==(isvalid.admin).toString()){
        console.log(req.headers.admin)
        console.log(isvalid.admin)

        return next(new ErrorHander("Your are not allowed to Delete this..!!", 401));
    }
    await Work.findByIdAndDelete(isvalid._id);
    res.status(200).json({
        success:true,
        message:"Work deleted successfully"
    })
})

