const express = require("express");
const {makeQuery} = require("../../../server");
const {adminRole} = require("../../../config/checkRole");
const fs = require('fs');
const {v4 : uuid} = require("uuid");
const { Products } = require("../../../database/models/newProduct");
const path = require("path");
const router = express.Router();



router.delete("/delete-product/:product_id",adminRole, async(req, res) => {
    const {product_id} = req.params;
    //delete product img
    const {dataValues:product} = await Products.findOne({where : {product_id}});
    if(!product){
        return res.status(404).send("product not found!");
    }
    console.log(product.fileName);
    const filePath =  path.join(__dirname,'../../../../client/public/uploads/' + product.fileName);

    try {
        fs.unlinkSync(filePath);
        console.log("File removed:", filePath);
    } catch (err) {
        console.error(err);
    }

    //delete product
    const query = "DELETE FROM products WHERE product_id=?";
    makeQuery.query(query,product_id, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("product deleted successfully!");
    } )
});


module.exports = router;