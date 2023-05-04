
const express = require("express");
const { adminRole } = require("./checkRole");
const path = require("path");
const { User } = require("../database/models/register");
const { addProduct } = require("../database/models/newProduct");
const { makeQuery } = require("../server");
const router = express.Router();


module.exports = function countItems(item, table){
    
    makeQuery.query("SELECT COUNT(?) FROM ?", [item, table], (err, result) => {
        if(err) throw err;

        console.log(result);
        return result;
    })
}