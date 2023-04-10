const {db} = require("../Connect");
const {DataTypes} = require("sequelize");
const {v4 : uuid} = require("uuid");

const newProduct = db.define("products", {
    
    key: {
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
        type: DataTypes.BLOB, // you will have to change it from mysql to 'LONGBLOB' to accept long data
    },
    fileName : {
        type: DataTypes.STRING,
    }
});

 
function addProduct(name, price, visible, description, fileData, fileName){
    // create the table
    db.sync();
    //create product
    newProduct.create({key : uuid(),name, price, visible, description, fileData, fileName}).then((result) => {
        console.log("product added successfully! ", result)
    }).catch(err => {
        console.log({"adding product error " : err})
    })
}


module.exports.addProduct = addProduct;

