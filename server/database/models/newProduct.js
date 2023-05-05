const {db} = require("../Connect");
const {DataTypes} = require("sequelize");
const {v4 : uuid} = require("uuid");
const {makeQuery} = require("../../server");
const newProduct = db.define("products", {
    
    product_id: {
        type : DataTypes.STRING,
        allowNull : false
    },
    name : {
        type: DataTypes.STRING,
        allowNull : false
    },
    price: {
        type : DataTypes.FLOAT,
        allowNull : false,
    },
    visible : {
        type: DataTypes.BOOLEAN,
        allowNull : false
    },
    description : {
        type : DataTypes.STRING,
    },
    rating : {
        type : DataTypes.SMALLINT
    },
    category_id : {
        type : DataTypes.INTEGER
    },
    member_id : {
        type : DataTypes.INTEGER
    },
    fileData : {
        type: DataTypes.JSON, // you will have to change it from mysql to 'LONGBLOB' to accept long data
    },
    fileName : {
        type: DataTypes.STRING,
    }
});

  
function addProduct(name, price, visible, description, fileData, fileName, member_id=1, category_id=1){
    // create the table. use {force : true} inside sync() to reset database
    db.sync();
    // change fileData datatype
    //makeQuery.query("ALTER TABLE products ALTER COLUMN fileData LONGBLOB")
    
    //create product
    newProduct.create({
        product_id : uuid(),
        name : name,
        price : price,
        visible : visible,
        description : description,
        fileData : fileData,
        fileName : fileName,
        category_id : category_id,
        member_id : member_id,
    }).then((result) => {
        console.log("product added successfully! ", result)
    }).catch(err => {
        console.log({"adding product error " : err})
    })
}
 
 
module.exports.addProduct = addProduct;
module.exports.Products = newProduct;


