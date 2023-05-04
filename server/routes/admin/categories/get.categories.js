const express = require("express");
const {makeQuery} = require("../../../server");
const { adminRole, loggedIn } = require("../../../config/checkRole");
const {v4 : uuid} = require("uuid");
const path = require("path");
const {checkItem} = require("../../../config/check.existing.item");
const { NewCategory, Categories } = require("../../../database/models/Categories");
const router = express.Router();


router.get("/admin/categories/get-all", loggedIn,adminRole, async(req, res) => {
    const {userId} = req.query;

    //get categories
    const categories = await Categories.findAll();
    console.log(categories);

    //send data
    res.status(200).json(categories);
})

module.exports = router;