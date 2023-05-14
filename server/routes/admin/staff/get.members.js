const express = require("express");
const {makeQuery} = require("../../../server");
const { adminRole, loggedIn } = require("../../../config/checkRole");
const {v4 : uuid} = require("uuid");
const {Op} = require("sequelize");
const path = require("path");
const { User, insertUser } = require("../../../database/models/register");
const checkItem = require("../../../config/check.existing.item");
const latestItem = require("../../../config/latest.item");
const router = express.Router();


router.get('/staff/members',loggedIn, adminRole, async(req, res) => {
    //get members
    const members = await User.findAll({
        where : {role : {[Op.not] : 'user'}, 
        // not including the current admin on the response
        user_id : {[Op.not] : req.session.user.user_id}
    }
    });

    //send data
    res.status(200).json(members);

});


// get one member info
router.get("/admin/get-member/:memberId",loggedIn, adminRole, async(req, res) => {
    const {memberId} = req.params;
    console.log(req.body);
    
    //check if member id sent
    if(memberId){
        const {dataValues : member} = await User.findOne({
            where : {user_id : memberId}
        });
        console.log(member);

        // if member exists, send his info
        if(member){
            return res.status(200).json(member);
        }

        // member not found
        res.status(404).json({err_message : "Member not found"});
    }
});

// get one member info
router.get("/user/get-user/:userId",loggedIn, async(req, res) => {
    const {userId} = req.params;
    console.log(req.body);
    
    //check if member id sent
    if(userId){
        const member = await User.findOne({
            where : {user_id : userId}
        });
        console.log(member);

        // if member exists, send his info
        if(member){
            return res.status(200).json(member);
        }

        // member not found
        res.status(404).json({err_message : "Member not found"});
    }
});



module.exports = router;