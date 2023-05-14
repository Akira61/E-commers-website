const express = require("express");
const {makeQuery} = require("../../../server");
const { adminRole, loggedIn } = require("../../../config/checkRole");
const {v4 : uuid} = require("uuid");
const path = require("path");
const {checkItem} = require("../../../config/check.existing.item");
const { NewCategory, Categories } = require("../../../database/models/Categories");
const router = express.Router();


router.get("/admin/categories/get-all", loggedIn,adminRole, async(req, res) => {
    const {userId} = req.query;
    const {sort} = req.query;

    let defaultSort = 'ASC';
    const sortOptions = ['ASC', 'DESC'];
    
    //check if sort includes in the url
    if(sort && sortOptions.includes(sort)){
        defaultSort = sort;
    };
    
    //get categories
    const categories = await Categories.findAll({
        order: [
            ['id', defaultSort],
        ],
    });
    console.log(categories);

    //send data
    res.status(200).json(categories);
}) 

// categories in the home page
router.get("/categories/visible/get-all", async(req, res) => {
    const {userId} = req.query;
    const {sort} = req.query;

    let defaultSort = 'ASC';
    const sortOptions = ['ASC', 'DESC'];
    
    //check if sort includes in the url
    if(sort && sortOptions.includes(sort)){
        defaultSort = sort;
    };
    
    //get categories
    const categories = await Categories.findAll({
        order: [
            ['id', defaultSort],
        ],
        where : {Visible : 1}
    });
    console.log(categories);

    //send data
    res.status(200).json(categories);
}) 

router.get('/admin/categories/get-one', loggedIn, adminRole, async(req, res) => {
    const {id} = req.query;
    console.log(id);

    const category = await Categories.findOne({where : {Category_id : id}});

    res.send(category)
})
module.exports = router;