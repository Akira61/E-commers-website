const express = require("express");
const {makeQuery} = require("../../server");
const {v4 : uuid} = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");
const { insertUser } = require("../../database/models/register");
const isAuth = require("./checkAuth");
const router = express.Router();



router.post("/login", (req, res) => {

    console.log(req.session)
    const {username} = req.body;
    const {password} = req.body;

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
            return res.send("user logged in successfully");
        }
        res.send("unvalid password");

    })

})


module.exports = router;