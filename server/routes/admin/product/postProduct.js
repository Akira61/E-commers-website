const express = require("express");
const fileupload = require("express-fileupload")
const {makeQuery} = require("../../../server");
const path = require("path");
const {addProduct} = require("../../../database/models/newProduct");
const {v4 : uuid} = require("uuid");
const { adminRole } = require("../../../config/checkRole");
const router = express.Router();

router.use(fileupload({createParentPath : true}));

router.post("/api/new-product", adminRole,(req, res) => {
    const {productName} = req.body;
    const {productDesc} = req.body;
    const {fileData} = req.files;
    const {visible} = req.body;
    const {price} = req.body;
    console.log(fileData);
    console.log(req.body);
    const newFileName = uuid() + fileData.name;
    const filePath = path.join(__dirname,'../../../../client/public/uploads/' + newFileName)
    fileData.mv(filePath);

    addProduct(productName, price, visible, productDesc, fileData, newFileName);
    //res.json({ imgUrl : newFileName});
});


module.exports = router;