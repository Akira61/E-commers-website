const express = require("express");
const {makeQuery} = require("../../server");
const { loggedIn } = require("../../config/checkRole");
const {User} = require('../../database/models/register');
const {v4 : uuid} = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");
const isAuth = require("./checkAuth");
const router = express.Router();


router.post("/login",async (req, res) => {
    const {username} = req.body;
    const {password} = req.body;

    //check if already logged in
    if(req.session.auth){
        return res.status(203).json({message : "Already logged in"});
    }

    // check if inputs filled or not
    if(!username || !password){
       return res.status(203).json({message : "Please fill the inputs"});
    }

    //check valid email
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegx.test(username)){
        return res.status(500).json({message : "Please enter a correct email"})
    }
    
    const query = "SELECT * FROM users WHERE username=?";
    makeQuery.query(query,[username], async(err, result) => {
        if (err) console.log(err)

        console.log(result);
        // if length == 0  user dosen't existes
        if(result.length < 1){
            return res.status(404).json({message : "unvalid username"});
        }
 
        // compaire input password with hashed password in DB
        const unHashPassword = await bcrypt.compare(password, result[0].password);
        if(unHashPassword){
            // const csrfToken = uuid();// set random char to prevent csrf attack
            req.session.user = result[0]; // set all user data
            req.session.username = result[0].username// setting username to session
            // req.session.csrfToken = csrfToken;
            req.session.role = result[0].role; // setting the role for user to be 'user'
            req.session.auth = true;// user authenticated
            
            console.log(req.session)
            return res.status(200).json({success : true});
        }

        // password uncorrect
        res.status(401).json({message : "unvalid password"});

    })

})


module.exports = router;