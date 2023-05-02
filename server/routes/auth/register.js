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
    
    console.log(name, username, password, confirmPass);

    if(!name || !username || !password || !confirmPass){
        return res.send("please feil the inputs"); 
    }
    if(password !== confirmPass){
        return res.send("password does not match");
    }

    //check if username already in the database
    const emailExists = await User.findOne({where : {username}});
    if(emailExists){
        return res.send("Email already exists");
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
    res.send("register complite please login");
    
    
})




module.exports = router;