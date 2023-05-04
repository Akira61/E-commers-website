const express = require("express");
const { adminRole } = require("./checkRole");
const path = require("path");
const { User } = require("../database/models/register");
const { addProduct, Products } = require("../database/models/newProduct");
const { makeQuery } = require("../server");
const router = express.Router();



// let LatestUsers =async function(limit, order='id'){

//     // const query = `SELECT * FROM ${table} LIMIT ${limit}`;
//     const data = await User.findAll({limit})
//     return data;
// }
// let LatestProducts =async function(limit, order='id'){
    
//     // const query = `SELECT * FROM ${table} LIMIT ${limit}`;
//     const data = await Products.findAll({limit, order :[order,'DESC']});
//     return data;
// }
let LatestItem =async function(table ,limit){
    
    //covert table inserted to lower case
    table.toLowerCase();

    if(table === 'user' || table === 'users'){
        const data = await User.findAll({limit})
        return data;
    }
    else if(table === 'product' || table === 'products'){
        const data = await Products.findAll({limit, order :[order,'DESC']});
        return data;
    }
    return;
}
// module.exports.LatestUsers = LatestUsers;
module.exports.LatestItem = LatestItem;
