const express = require("express");
const {makeQuery} = require("../../../server");
const { adminRole } = require("../../../config/checkRole");
const {v4 : uuid} = require("uuid");
const {Op} = require("sequelize");
const path = require("path");
const { User, insertUser } = require("../../../database/models/register");
const router = express.Router();


router.get('/staff/members', adminRole, async(req, res) => {

    //get members
    const members = await User.findAll({
        where : {role : {[Op.not] : 'user'}}
    });

    //send data
    res.status(200).json(members);

});

module.exports = router;