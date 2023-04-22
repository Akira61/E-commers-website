const express = require("express");
// router.use(session())


module.exports.adminRole = function (req, res, next){
    const { role } = req.session;
    if(role === 'admin'){
       return next();
    }
    res.status(401).send("you don't have a pormision :(");
};

module.exports.loggedIn = function (req, res, next){
    const { role } = req.session;
    if(role){
        return next()
    };
    res.status(401).send("you are not authenticate:(");

}