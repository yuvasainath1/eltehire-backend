const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto=require("crypto");

const userSchema = new mongoose.Schema({
            name:{
                type: String,
                required: [true, "Please Enter Your Name"],
            },
            email:{
                type: String,
                required: [true, "Please Enter Your Email"],
                validate: [validator.isEmail, "Please Enter a valid Email"],
            },
            password:{
                type: String,
                required: [true, "Please Enter Your password"],
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            resetPasswordToken: String,
            resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });  

// comparing the jwt token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
};


//Comparing the password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
};
  
module.exports = mongoose.model("User", userSchema);
  
