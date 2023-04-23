const express = require("express");
const {session} = require("../../server")
const {makeQuery} = require("../../server");
const { adminRole } = require("../../config/checkRole");
const {v4 : uuid} = require("uuid");
const path = require("path");
const router = express.Router();



router.get("/api/products",(req, res) => {
    const query = "select * FROM products";

    makeQuery.query(query, (err, result) => {
        if(err) throw err;
        res.send(result)
    })
})


 
router.get("/get-product/:key", (req, res) => {
    const {key} = req.params;
    //console.log("*".repeat(30),key);
    const query = "SELECT * FROM products where product_id= ?";
            
    makeQuery.query(query,key, (err, result) => {
        if(err) throw err

        res.send(result[0]);
    })
}) 


module.exports = router;