const {db} = require("../Connect");
const {DataTypes} = require("sequelize");
const {v4 : uuid} = require("uuid");
const {makeQuery} = require("../../server");

const category = db.define("categories",{

    Category_id :{
        type : DataTypes.STRING,
        allowNull : false,
    },

    Name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },

    Description : {
        type : DataTypes.STRING,
        allowNull : false,
        defaultValue : 'No Description Found'
    },

    Ordering : {
        type : DataTypes.FLOAT,
    },

    Visible : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : 0 // false
    },

    Allow_Comments: {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : 0 // false
    },

    Allow_Ads: {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : 0 // false
    }

});


function NewCategory(Name, visible, description, Ordering, Allow_Comments, Allow_Ads){
    // create the table. use {force : true} inside sync() to reset database
    db.sync();
    
    //create Category
    category.create({
        Category_id : uuid(),
        Name : Name,
        Description : description, 
        Ordering : Ordering, 
        Visible : visible, 
        Allow_Comments : Allow_Comments,
        Allow_Ads : Allow_Ads
    }).then((result) => {
        console.log("product added successfully! ", result)
    }).catch(err => {
        console.log({"adding product error " : err})
    })
}
 

module.exports.NewCategory = NewCategory;
module.exports.Categories = category;