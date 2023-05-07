const express = require("express");
const {makeQuery} = require("../../../server");
const { adminRole, loggedIn } = require("../../../config/checkRole");
const {v4 : uuid} = require("uuid");
const path = require("path");
const {checkItem} = require("../../../config/check.existing.item");
const { NewCategory, Categories } = require("../../../database/models/Categories");
const router = express.Router();


router.post("/admin/categories/new-category", loggedIn, adminRole, async(req, res) => {
    const {name,description,
    visible,allowComments,allowAds, userId} = req.body;

    // check user_id sent
    if(req.session.user.user_id !== userId){
        return res.status(401).json({err_message : "unautheraized"});
    }
    //check if fields filled
    if(!name || !description){
        return res.status(500).json({err_message : "Please Complete The Form"});
    }
    
    // check if category already exists
    name.toLowerCase()// change the name to lower case
    const categoryExists = await Categories.findOne({where: {name}});
    if(categoryExists){
        return res.status(500).json({err_message : "Category already exists"});
    }

    // insert category
    NewCategory(name, visible, description, allowComments, allowAds);
    res.status(200).json({success: true});

})

module.exports = router;