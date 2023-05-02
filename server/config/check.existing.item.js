const express = require("express");
const { adminRole } = require("./checkRole");
const path = require("path");
const { User } = require("../database/models/register");
const { addProduct } = require("../database/models/newProduct");
const { makeQuery } = require("../server");
const router = express.Router();


// to check if item given is exists in the database or not

module.exports.userExists = async function (query){
    //check if username already in the database

    const itemExists = await User.findOne({where : {query}});
    if(itemExists){
        return res.json({err_message : "Email already exists"});
    }
    return itemExists
}

