const express = require("express");
const {makeQuery} = require("../../server");
const {v4 : uuid} = require("uuid");
const {insertUser} = require("../../database/models/register");
const router = express.Router();



router.post("/register",async (req, res) => {
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
        insertUser(name, username, password);
        res.send("register complite please login");
    })
    
})




module.exports = router;