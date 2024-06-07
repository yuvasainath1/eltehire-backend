const express=require('express');
const {
    registerAdmin,
    LoginAdmin,
    deleteAdmin,
    updateAdmin 
}=require('../controllers/Admincontrollers');

const {isAuthenticatedAdmin}=require('../middlewares/auth')

const router=express.Router();

router.route('/register').post(registerAdmin);

router.route('/login').post(LoginAdmin);

router.route('/delete').delete(isAuthenticatedAdmin,deleteAdmin);

router.route('/update').put(isAuthenticatedAdmin,updateAdmin);

module.exports = router;