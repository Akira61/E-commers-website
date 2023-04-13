const express = require("express");


module.exports = (location, req, res, next) => {
    if (req.session.auth){
        return res.redirct(location);
    };
    next();
};