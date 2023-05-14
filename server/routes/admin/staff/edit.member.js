const express = require("express");
const {makeQuery} = require("../../../server");
const { adminRole, loggedIn } = require("../../../config/checkRole");
const {Op} = require("sequelize");
const {v4 : uuid} = require("uuid");
const path = require("path");
const { User, insertUser } = require("../../../database/models/register");
const router = express.Router();

router.put("/admin/edit-member",loggedIn, adminRole, async (req, res) => {
    const {name} = req.body;
    const {username} = req.body;
    const {role} = req.body;
    const {userId} = req.body;
    const {memberId} = req.body;
    console.log("$".repeat(3),req.body)

    //check user id sent
    if(userId !== req.session.user.user_id){
        return res.status(401).json({err_message : 'unautheraized'});
    }

    //check if fields are filled
    if(!username || !name || !role){
        return res.status(500).json({err_message : "Please Fill The Form"});
    }

    //check if username already in the database
    const emailExists = await User.findOne({
        where : {username},
        // don't include current user
        
    });

    // check if email exists and the email doesn't equal the current member email
    if(emailExists && emailExists.user_id !== memberId){
        return res.json({err_message : "Email already exists"})
    }

    //check if name alerady exists
    if(emailExists.dataValues.name == name){
        return res.json({err_message : "Name Already Exists"})
    }

    // update 
    const updateMember = await User.update({name, username, role},
        {where : {user_id : memberId}}
    );
    
    if(updateMember){
        console.log("member updated successfully");
        res.status(200).json({success :true})
    }
})

module.exports = router;