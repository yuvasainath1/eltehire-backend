const express=require('express');
const{
    createNew,
    update,
    details,
    myworks,
    deletework
}=require('../controllers/Workcontrollers')

const {isAuthenticatedAdmin}=require('../middlewares/auth')

const router=express.Router();

router.route('/createnew').post(isAuthenticatedAdmin,createNew);

router.route('/update').post(isAuthenticatedAdmin,update);

router.route('/details').get(details);

router.route('/myuploads').get(isAuthenticatedAdmin,myworks);

router.route('/deletework').delete(isAuthenticatedAdmin,deletework);

module.exports = router;
