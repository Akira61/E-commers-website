const express = require("express");
const {makeQuery} = require("../../../server");
const { adminRole, loggedIn } = require("../../../config/checkRole");
const {v4 : uuid} = require("uuid");
const path = require("path");
const router = express.Router();



router.get("/products",adminRole,(req, res) => {
    //"select * FROM products"
    const {sort} = req.query;
    let defaultSort = 'ASC';
    const sortOptions = ['ASC', 'DESC'];
    if(sort && sortOptions.includes(sort)){
        defaultSort = sort;
    }
    const query = `
    select products.*,
    categories.Name AS Category_Name,
    users.name AS member_name 
    FROM products
    LEFT JOIN categories ON categories.id = products.category_id
    LEFT JOIN users ON users.id = products.member_id
    
    `;
 
    makeQuery.query(query, (err, result) => {
        if(err) throw err;
        res.json(result)
    })
})

 
router.get("/get-product/:key", (req, res) => {
    const {key} = req.params;
    //console.log("*".repeat(30),key);
    const query = `
    select products.*,
    categories.Name AS Category_Name,
    users.name AS member_name 
    FROM products
    LEFT JOIN categories ON categories.id = products.category_id
    LEFT JOIN users ON users.id = products.member_id
    WHERE product_id= ?`;
            
    makeQuery.query(query,key, (err, result) => {
        if(err) throw err

        res.send(result[0]);
    })
}) 

router.get("/products/last-products", loggedIn,adminRole, (req, res) => {
    const {sort} = req.query;
    const {limit} = req.query;
    let defaultSort = 'ASC';
    const sortOptions = ['ASC', 'DESC'];
    if(sort && sortOptions.includes(sort)){
        defaultSort = sort;
    };
    const query = `SELECT * FROM products ORDER BY products.id ${defaultSort} LIMIT ${limit}`;
    makeQuery.query(query, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json(result);
    })
})
module.exports = router;