const express = require("express");
const {session} = require("../../server")
const {makeQuery} = require("../../server");
const { adminRole } = require("../../config/checkRole");
const {v4 : uuid} = require("uuid");
const path = require("path");
const router = express.Router();


router.get('/user-product/:userID', (req, res)=> {
    
});