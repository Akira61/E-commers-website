const express = require("express");
const fileupload = require("express-fileupload")
const {makeQuery} = require("../../../server");
const {v4 : uuid} = require("uuid");
const path = require("path");
const { adminRole } = require("../../../config/checkRole");
const { Categories } = require("../../../database/models/Categories");
const router = express.Router();
 
 

router.put("/update-product/:product_id",adminRole, async(req, res) => {
    const {product_id} = req.params;
    const {name} = req.body;
    const {price} = req.body;
    const {description} = req.body;
    const {visible} = req.body;
    const {rating} = req.body;
    const {category} = req.body;
    //const {fileData} = req.body;
    console.log("put ".repeat(40))
    
    //find if category exists
    let newCate;
    const {dataValues:categoryExists} = await Categories.findOne({where : {Name : category}});
    console.log(categoryExists)
    if(categoryExists){ newCate = categoryExists.id}
    else{newCate = null};

    console.log(newCate)


    const query = "UPDATE products SET name=? , price=?, description=?, visible=?, rating=?, category_id=? WHERE product_id=?";
 
    const variables = [name, price, description,JSON.parse(visible),parseFloat(rating),newCate, product_id];
    makeQuery.query(query, variables, (err, result) => {
        if (err) throw err
        console.log(result);
        res.send(result);
    }) 
})

module.exports = router;