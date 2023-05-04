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
    fileData : {
        type: DataTypes.JSON, // you will have to change it from mysql to 'LONGBLOB' to accept long data
    },
    fileName : {
        type: DataTypes.STRING,
    }
});

  
function addProduct(name, price, visible, description, fileData, fileName){
    // create the table. use {force : true} inside sync() to reset database
    db.sync();
    // change fileData datatype
    //makeQuery.query("ALTER TABLE products ALTER COLUMN fileData LONGBLOB")
    
    //create product
    newProduct.create({product_id : uuid(),name : name, price : price, visible : visible, description : description, fileData : fileData, fileName : fileName}).then((result) => {
        console.log("product added successfully! ", result)
    }).catch(err => {
        console.log({"adding product error " : err})
    })
}
 
 
module.exports.addProduct = addProduct;
module.exports.Products = newProduct;


