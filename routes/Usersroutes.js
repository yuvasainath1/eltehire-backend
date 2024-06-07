const express=require('express');
const {
   registerUser,
   loginUser,
   getUserdatails,
   deleteUser,
   getAllUsers,
   getSingleUser,
   updateUser,
} =require('../controllers/Usercontrollers')

const {isAuthenticated}= require("../middlewares/auth");

const router=express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated,getUserdatails);

router.route("/allusers").get(isAuthenticated,getAllUsers);

router.route("/singleuser").get(isAuthenticated,getSingleUser);

router.route("/me/update").put(isAuthenticated,updateUser);

router.route("/delete/account").delete(isAuthenticated,deleteUser);

module.exports = router;