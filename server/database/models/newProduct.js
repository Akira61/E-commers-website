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
        type : DataTypes.INTEGER
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
 
// addProduct("d",3,false,'ds','df','df')
function addProduct(name, price, visible, description, fileData, fileName,rating=5, member_id=null, category_id=null){

    //foreign key
    // const query = `
    // ALTER TABLE products 
    // ADD  CONSTRAINT Cate
    // FOREIGN KEY(category_id) REFERENCES categories(id)
    // ON UPDATE CASCADE
    // ON DELETE CASCADE`
    // makeQuery.query(query, (err, result) => {
    //     if(err) throw err;
    //     console.log(result);
    // })
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
        rating : rating,
        fileData : fileData,
        fileName : fileName,
        member_id : member_id,
        category_id : category_id,
    }).then((result) => {
        console.log("product added successfully! ", result)
    }).catch(err => {
        console.log({"adding product error " : err})
    })
}

 
module.exports.addProduct = addProduct;
module.exports.Products = newProduct;


