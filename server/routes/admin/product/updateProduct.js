const express = require("express");
const fileupload = require("express-fileupload")
const {makeQuery} = require("../../../server");
const {v4 : uuid} = require("uuid");
const path = require("path");
const { adminRole } = require("../../../config/checkRole");
const router = express.Router();
 


router.put("/update-product/:product_id",adminRole, (req, res) => {
    const {product_id} = req.params;
    const {name} = req.body;
    const {price} = req.body;
    const {description} = req.body;
    const {visible} = req.body;
    //const {fileData} = req.body;
    console.log("put ".repeat(40))

    const query = "UPDATE products SET name=? , price=?, description=?, visible=? WHERE product_id=?";

    const variables = [name, price, description, visible, product_id];
    makeQuery.query(query, variables, (err, result) => {
        if (err) throw err
        console.log(result);
        res.send(result);
    }) 
})

module.exports = router;