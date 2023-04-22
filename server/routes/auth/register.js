require("dotenv").config();
const express = require("express");
const {makeQuery} = require("../../server");
const { loggedIn } = require("../../config/checkRole");
const {v4 : uuid} = require("uuid");
const nodemailer = require("nodemailer");
const passport = require("passport");
const {insertUser} = require("../../database/models/register");
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

    // check if user exists
    const query = "SELECT * FROM users WHERE username=?";
    makeQuery.query(query, username, (err, result) => {
        if (err) throw err;
        console.log(result);
        // if length result != 0 that means there is a user with this email
        if(result.length !== 0){
            return res.send("user already exists. please try to login");
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
        insertUser(name, username, password);
        res.send("register complite please login");
    })
    
})




module.exports = router;