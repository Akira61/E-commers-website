const express = require("express");
const {makeQuery} = require("../../server");
const { loggedIn } = require("../../config/checkRole");
const {v4 : uuid} = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");
const isAuth = require("./checkAuth");
const router = express.Router();


router.post("/login", (req, res) => {
    const {username} = req.body;
    const {password} = req.body;

    // check if inputs filled or not
    if(!username || !password){
       return res.status(200).send("please feil the inputs");
    }
    
    const query = "SELECT * FROM users WHERE username=?";
    makeQuery.query(query,[username], async(err, result) => {
        if (err) console.log(err)

        if(result.length ==0){
            return res.send("unvalid username");
        }
        const unHashPassword = await bcrypt.compare(password, result[0].password);
        if(unHashPassword){
            req.session.role = result[0].role;
            req.session.auth = true;
            console.log(req.session)
            return res.send("user logged in successfully");
        }
        res.send("unvalid password");

    })

})


module.exports = router;