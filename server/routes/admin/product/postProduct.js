const express = require("express");
const fileupload = require("express-fileupload")
const {makeQuery} = require("../../../server");
const path = require("path");
const {addProduct} = require("../../../database/models/newProduct");
const {v4 : uuid} = require("uuid");
const { adminRole, loggedIn } = require("../../../config/checkRole");
const { NewCategory, Categories } = require("../../../database/models/Categories");
const router = express.Router();

router.use(fileupload({createParentPath : true}));

router.post("/product/new-product",loggedIn, adminRole,async(req, res) => {
    const {productName} = req.body;
    const {productDesc} = req.body;
    const {fileData} = req.files;
    const {visible} = req.body;
    const {price} = req.body;
    const {rating} = req.body;
    const {category} = req.body;
    const {categoryId} = req.body;

    console.log(req.body);
    const memberId = req.session.user.id;

    //check if valid info
    if(!productName && !price && !productDesc && !visible && !rating && !fileData){
        return res.status(500).json({err_message : "Please Complete The Form"})
    }

    //find if category exists
    let newCate;
    const {dataValues:categoryExists} = await Categories.findOne({where : {Name : category}});
    console.log(categoryExists)
    if(categoryExists){ newCate = categoryExists.id}
    else{newCate = null};
 
    const newFileName = uuid() + fileData.name;
    newFileName.split(" ").join("");
    const filePath = path.join(__dirname,'../../../../client/public/uploads/' + newFileName)
    fileData.mv(filePath);
    addProduct(productName, price, visible, productDesc, fileData, newFileName, rating,parseInt(memberId),newCate);
    res.json({ success : true});
});


module.exports = router;