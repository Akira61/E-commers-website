const express = require("express");
const {makeQuery} = require("../../server");
const { loggedIn } = require("../../config/checkRole");
const {User} = require('../../database/models/register');
const {v4 : uuid} = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");
const router = express.Router();


router.get("/edit-profile/:id",loggedIn, (req, res) => {
    const {id} = req.params;
 
    // if session sent doesn't equal the persone session stop the function
    if(req.session.user.user_id != id) return res.status(401).json({msg : "not auth"});

    if(!id) return;// if there is no id stop 
    const query = "SELECT username, name FROM users WHERE user_id=? LIMIT 1";
    makeQuery.query(query, [id], (err, result) => {
        if(err) throw err;
        console.log(result[0]);
        if(result[0]){
            res.json(result[0]);
        }
    })
});


router.put("/edit-profile/:id",loggedIn, async(req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const {username} = req.body;
    const {password} = req.body;
    console.log(req.body);

    // check inputs filled or not
    if(!name && !username && !password){
        return res.json({msg : "Please fill the inputs"});
    }

    console.log(req.session.user.user_id);
    console.log(id)

    // if session sent doesn't equal the persone session stop the function
    if(req.session.user.user_id != id) return res.status(401).json({msg : "not auth"});
    
    const hashedPass = await bcrypt.hash(password, 10);
    // const query = "UPDATE users SET name=?, username=?, password=? WHERE user_id=?";
    // makeQuery.query(query, [name,username,hashedPass,id], (err, result) => {
    //     if(err) throw err;
    //     console.log("user updated successfully");

    // });

    const update = await User.update({
        name : name,
        username : username,
        
    },
    {where : {user_id : id}}
    );
    console.log(update);

});

module.exports = router
