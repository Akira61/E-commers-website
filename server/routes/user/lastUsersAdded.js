const express = require("express");
const {makeQuery} = require("../../server");
const { loggedIn, adminRole } = require("../../config/checkRole");
const {User} = require('../../database/models/register');
const {v4 : uuid} = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");
const { LatestUsers, LatestItem } = require("../../config/latest.item");
const router = express.Router();
 

router.get("/last-users-added",adminRole, (req, res) => {
    // get how many users he wanst from query
    const {many} = req.query;
    const latest = LatestItem('user',parseInt(many))
    latest.then(result => {
        console.log("$".repeat(3),result)
        res.send(result);
    });
})

module.exports = router;