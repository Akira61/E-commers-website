const express = require("express");
// router.use(session())


module.exports.adminRole = function (req, res, next){
    const { role } = req.session;
    if(role === 'user'){
        return res.status(401).send("you don't have a pormision :(");
    }
    return next();
};

module.exports.loggedIn = function (req, res, next){
    const { auth } = req.session;
    if(auth){
        return next()
    };
    res.status(401).send("you are not authenticate:(");

}