const express = require("express");
const {makeQuery} = require("../../server");
const {addProduct} = require("../../database/models/newProduct");
const {v4 : uuid} = require("uuid");
const path = require("path");
const router = express.Router();


router.get("/api/products", (req, res) => {
    const query = "select * FROM products";

    makeQuery.query(query, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send(result)
    })
})


 
router.get("/get-product/:key", (req, res) => {
    const {key} = req.params;
    console.log("*".repeat(30),key);
    const query = "SELECT * FROM products where product_id= ?";
            
    makeQuery.query(query,key, (err, result) => {
        if(err) throw err

        const b64 = Buffer.from(result[0].fileData).toString("base64");
        const extention = path.extname(result[0].fileName);
        console.log(extention)
        const image = `data:image/${extention.slice(1)};base64,${b64}`;
       // result[0].fileData = image;
        console.log(result[0]);
        res.send(result[0]);
    })
}) 



module.exports = router;