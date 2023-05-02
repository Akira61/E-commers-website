const express = require("express");
const {makeQuery} = require("../../server");
const { loggedIn } = require("../../config/checkRole");
const {User} = require('../../database/models/register');
const {v4 : uuid} = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");
const router = express.Router();


router.put("/change-password/",loggedIn, async(req, res) => {
    const {userId} = req.body;
    const {currentPass} = req.body;
    const {newPass} = req.body;
    const {confirmPass} = req.body;


    // check if user id exists
    if(req.session.user.user_id != userId) return res.status(401).json({
        err_message : "user not auth"
    });

    // check newPass and confirm pass matchise
    if(confirmPass !== newPass)return res.status(400).json({
        err_message : "New Password Doesn't Match with Confirm Password"
    });

    // find the user
    const {dataValues: user} = await User.findOne({where : {user_id : userId}});

    // compaire password resived with password in the database
    const validPass = await bcrypt.compare(currentPass, user.password);
    
    //no password match
    if(!validPass){
        console.log("not valid password");
        return res.status(400).json({err_message : 'Please enter the right password'});
    }

    //if new user is the same as old one, pass
    if(newPass === currentPass) return res.status(200).json({success : true});;

    //password resived are correct, hash the new password
    const hashedPass = await bcrypt.hash(newPass, 10);

    // update password
    User.update({
        password : hashedPass
    },
    {where :  {user_id : userId}}
    );

    //send success confirm
    res.status(200).json({success : true});
});



module.exports = router;
