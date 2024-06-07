const express = require("express");
const {
    helloserver,
} = require('../controllers/test');
const router=express.Router();

router.route("/hello").get(helloserver);

module.exports=router