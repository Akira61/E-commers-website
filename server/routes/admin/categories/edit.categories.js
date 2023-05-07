const express = require("express");
const { adminRole, loggedIn } = require("../../../config/checkRole");
const {Op} = require("sequelize");
const { NewCategory, Categories } = require("../../../database/models/Categories");
const router = express.Router();



router.put("/admin/categories/Edit-category", loggedIn, adminRole, async(req, res) => {
    const {Category_id} = req.body;
    const {Name,
    Description,Visible,
    Allow_Comments, Allow_Ads, userId} = req.body;
    
    //check user id sent
    if(userId !== req.session.user.user_id){
        return res.status(401).json({err_message : 'unautheraized'});
    }

    //check if Category already in the database
    const categoryExists = await Categories.findOne({
        where : {Name},
    });

    if(categoryExists && categoryExists.Category_id !== Category_id){
        return res.json({err_message : "Category already exists"})
    }

    if(Category_id){
        const updateCate = await Categories.update({
            Name, Description,
            Visible, Allow_Ads, Allow_Comments
        },
        {where : {Category_id}}
        );

        if(updateCate){
            return res.status(200).json({success : true})
        }
    }
});


module.exports = router;