const express = require("express");
const {makeQuery} = require("../../server");
const path = require("path");
const {addProduct} = require("../../database/models/newProduct");
const {v4 : uuid} = require("uuid");
const router = express.Router();



router.post("/api/new-product", (req, res) => {
    const {productName} = req.body;
    const {productDesc} = req.body;
    const {fileData} = req.body;
    const {fileName} = req.body;
    const {visible} = req.body;
    const {price} = req.body;
    console.log(req.body);
    const newFileName = uuid() + fileName.slice(-5);
    addProduct(productName, price, visible, productDesc, fileData, newFileName);
    res.json({ imgUrl : newFileName});
});


module.exports = router;