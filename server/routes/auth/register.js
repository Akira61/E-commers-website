require("dotenv").config();
const express = require("express");
const {makeQuery} = require("../../server");
const { loggedIn } = require("../../config/checkRole");
const {v4 : uuid} = require("uuid");
const nodemailer = require("nodemailer");
const passport = require("passport");
const {insertUser, User} = require("../../database/models/register");
const router = express.Router();



router.post("/register", async (req, res) => {
    const {name} = req.body;
    const {username} = req.body;
    const {password} = req.body;
    const {confirmPass} = req.body;

    //check if user logged in
    if(req.session.auth){
        return res.json({err_message : "Already logged in"});
    }

    console.log(name, username, password, confirmPass);

    if(!name || !username || !password.trim().length || !confirmPass.trim().length){
        return res.json({err_message : "please feil the inputs"}); 
    }

    //check valid email
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegx.test(username)){
        return res.json({err_message : "Please enter a correct email"});
    }
    if(password !== confirmPass){
        return res.json({err_message : "Passwords does not match"});
    }

    if(password.length < 6){
        return res.json({err_message : "Password must be 6 characters or longer"});
    }

    //check if username already in the database
    const emailExists = await User.findOne({where : {username}});
    if(emailExists){
        return res.json({err_message : "User Already Exists"});
    }

    //************verify email with nodemailer***************
    nodemailer.createTransport({
        service : process.env.service,
        auth : {
            user : process.env.user,
            pass: process.env.password
        }
    });
    const emailBody = {
        from: process.env.user,
        to : username,
        subject : "please verify your email",
        body : ``
    }

    // insert user
    insertUser(name, username, password);
    res.status(200).send({success : true});
    
    
})




module.exports = router;