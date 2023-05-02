const express = require("express");
const {makeQuery} = require("../../../server");
const { adminRole } = require("../../../config/checkRole");
const {v4 : uuid} = require("uuid");
const path = require("path");
const { User, insertUser } = require("../../../database/models/register");
const router = express.Router();


router.post('/staff/manage/add-member', (req, res) => {
    const {userId} = req.body;
    const {username} = req.body;
    const {name} = req.body;
    const {password} = req.body;    
    console.log(req.body);

    if(req.session.user.role === "user"){
        return res.status(401).json({err_message : "unautheraized"});
    }

    // check user_id sent
    if(req.session.user.user_id !== userId){
        return res.status(401).json({err_message : "unautheraized"});
    }

    // check inputs filled or not
    if(!name || !username || !password){
        return res.json({err_message : "Please fill the inputs"});
    }

    //check valid email
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegx.test(username)){
        return res.json({err_message : "Please enter a correct email"})
    }

    // password will be hashed by the function
    insertUser(name , username, password, 'staff');

});

module.exports = router;
