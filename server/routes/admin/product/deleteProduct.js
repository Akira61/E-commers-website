const express = require("express");
const {makeQuery} = require("../../../server");
const {adminRole} = require("../../../config/checkRole")
const {v4 : uuid} = require("uuid");
const router = express.Router();



router.delete("/delete-product/:product_id",adminRole, (req, res) => {
    const {product_id} = req.params;
    const query = "DELETE FROM products WHERE product_id=?";
    makeQuery.query(query,product_id, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("product deleted successfully!");
    } )
});


module.exports = router;