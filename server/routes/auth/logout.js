const express = require("express");
const {makeQuery} = require("../../server");

const router = express.Router();


router.delete("/logout/:userID", (req, res) => {
    const user = req.params.userID;
    makeQuery.query("SELECT user_id FROM users WHERE user_id=?",[user], (err, result) => {
        if(err) throw err;
        console.log(result[0]);
        if(result[0]){
            req.session.destroy();
            res.clearCookie('connect.sid');// clear cookie from client
            res.send("cookie cleard");
            return;
        }

    })
});


module.exports = router;