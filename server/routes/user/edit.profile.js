const express = require("express");
const {makeQuery} = require("../../server");
const { loggedIn } = require("../../config/checkRole");
const {User} = require('../../database/models/register');
const {v4 : uuid} = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");
const router = express.Router();
 

router.get("/edit-profile",loggedIn, (req, res) => {
    const {userId :id} = req.body;
 
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


router.put("/edit-profile/",loggedIn, async(req, res) => {
    const {userId : id} = req.body;
    let {name} = req.body;
    let {username} = req.body;
    console.log(req.body);

    // check inputs filled or not
    if(!name && !username){
        return res.json({err_message : "Please fill the inputs"});
    }

    //check correct email or not
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegx.test(username)){
        return res.json({err_message : "Please enter a correct email"})
    }

    console.log(req.session.user.user_id);
    console.log(id)

    // if session sent doesn't equal the persone session stop the function
    if(req.session.user.user_id != id) return res.status(401).json({err_message : "not auth"});

    //find user
    const {dataValues : user} = await User.findOne({where : {user_id : id}});

    // if username field is empty set old useranme
    if(username ===''){
        username = user.username;
    }

    //if name field is empty set old name
    if(name ===''){
        name = user.name;
    }

    //update user
    const update = await User.update({name ,username},
        {where : {user_id : id}}
    );
    console.log(update);
    res.status(200).json({success : true});

});

module.exports = router
