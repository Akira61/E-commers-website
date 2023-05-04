const express = require("express");
const { adminRole, loggedIn } = require("../../../config/checkRole");
const {Op} = require("sequelize");
const { NewCategory, Categories } = require("../../../database/models/Categories");
const router = express.Router();


router.delete("/admin/categories/delete-category/:adminId/:Category_id", loggedIn, adminRole, async(req, res) => {
    const {Category_id} = req.params;
    const {adminId} = req.params;

    if(!Category_id || !adminId){
        return;
    }
 
    if(req.session.user.user_id !== adminId){
        return res.status(401).json({err_message : "unautheriazed"});
    }

    //check if user exists
    const CategoryExists = await Categories.findOne({where : {Category_id}});
    if(!CategoryExists){
        return res.json({err_message : "user doesn't exists"})
    }

    Categories.destroy({
        where : {Category_id}
    });
    return res.status(200).json({success : true});
})


module.exports = router;