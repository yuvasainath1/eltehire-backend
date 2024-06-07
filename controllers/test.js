const catchAsyncerrors = require('../middlewares/catchAsyncerrors')

exports.helloserver= catchAsyncerrors(async(req,res,next)=>{
    res.status(200).json({
        message:"Hello i am server",
    });
});