const express = require("express");
const {makeQuery} = require("../../../server");
const { adminRole } = require("../../../config/checkRole");
const {v4 : uuid} = require("uuid");
const path = require("path");
const { User, insertUser } = require("../../../database/models/register");
const { userExists } = require("../../../config/check.existing.item");
const router = express.Router();


router.delete("/admin/delete-member/:adminId/:memberId", adminRole, async(req, res) => {
    const {memberId : user_id} = req.params;
    const {adminId} = req.params;

    if(!user_id || !adminId){
        return;
    }
 
    if(req.session.user.user_id !== adminId){
        return res.status(401).json({err_message : "unautheriazed"});
    }

    //check if user exists
    const userExists = await User.findOne({where : {user_id}});
    if(!userExists){
        return res.json({err_message : "user doesn't exists"})
    }

    User.destroy({
        where : {user_id}
    });
    return res.status(200).json({success : true});
})

module.exports = router;