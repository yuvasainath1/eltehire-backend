// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    
    res.status(statusCode).json({
      success: true,
      user,
      token,
    });
};

exports.sendTokenAdmin=(admin,statusCode,res)=>{
  const token=admin.getJWTToken();
  res.status(statusCode).json({
    success:true,
    admin,
    token,
  })
}
module.exports = sendToken;
  