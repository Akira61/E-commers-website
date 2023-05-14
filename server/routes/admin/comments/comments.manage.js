
const express = require("express");
const {makeQuery} = require("../../../server");
const path = require("path");
const {v4 : uuid} = require("uuid");
const { adminRole, loggedIn } = require("../../../config/checkRole");
const {  Categories } = require("../../../database/models/Categories");
const { Comment } = require("../../../database/models/comments");
const router = express.Router();

router.get("/comments/get-all", loggedIn, adminRole, (req, res) => {
    const {sort} = req.query;
    const {limit} = req.query;

    let defaultSort = 'ASC';
    const sortOptions = ['ASC', 'DESC'];
    if(sort && sortOptions.includes(sort)){
        defaultSort = sort;
    }
    const query = `SELECT comments.*,
    products.name AS product_name,
    users.name,
    users.username FROM comments
    LEFT JOIN products ON products.id = comments.product_id
    LEFT JOIN users ON users.id = comments.user_id
    ORDER BY id ${defaultSort} ${limit?`LIMIT ${limit}`:';'}
    `;
    makeQuery.query(query, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});
 
 
router.get("/comments/get-one", loggedIn, adminRole, (req, res) => {
    const {product_id} = req.query;
     
    const query = `SELECT comments.*,
    products.name AS product_name,
    users.name,
    users.username FROM comments
    LEFT JOIN products ON products.id = comments.product_id
    LEFT JOIN users ON users.id = comments.user_id
    WHERE comments.product_id = ${product_id}
    `;
    makeQuery.query(query, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});

// get user comments
router.get("/comments/user-comment/:id", loggedIn, adminRole, (req, res) => {
    const {id} = req.params;
     
    const query = `SELECT comments.*,
    products.name AS product_name,
    users.name,
    users.username FROM comments
    LEFT JOIN products ON products.id = comments.product_id
    LEFT JOIN users ON users.id = comments.user_id
    WHERE comments.user_id = ${id}
    `;
    makeQuery.query(query, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});

router.delete("/comments/delete-one", loggedIn, adminRole, (req, res) => {
    const {id} = req.query;

    const query = "DELETE FROM comments WHERE comment_id=?";
    makeQuery.query(query,id, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json({success : true});
    } )
})

module.exports = router;