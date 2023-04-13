require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);
const cors = require("cors");
const mysql = require("mysql");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 4000;


//database query config (we initilze database and rows with sequelize and we query data with mysql)
const sqlOptions = {
    host : process.env.MYSQL_HOST,
    database : process.env.MYSQL_DBNAME,
    user : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
};
const makeQuery = mysql.createConnection(sqlOptions)
module.exports.makeQuery = makeQuery;


// **************Middlwares********************
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: "*"}));
app.use(passport.initialize());


//***************session******************
const sessionStore = new mysqlStore(sqlOptions);
app.use(session({
    secret : process.env.session_secret,
    resave : false,
    //to prevent setting a new session every time
    saveUninitialized : false,
    cookie : {
        maxAge : /* 14 * 24 * */ 3600000 // 14 days
    },
    store : sessionStore,
}))
module.exports.session = session;

// ************************Routes**************************

app.get("/image/:id", (req, res) => {
    const {id} = req.params;
    console.log(id)
    const query = "Select * From products where fileName=?";
    makeQuery.query(query,id,(err, result) => {
        if(err) throw err
        console.log(result);
        console.log(result[0].fileData);
        res.send(result[0].fileData);
    })
})  

//get all products / single product
app.use("/", require("./routes/product/getProduct"));
// add product
app.use("/", require("./routes/product/postProduct"));
//update product
app.use("/", require("./routes/product/updateProduct"));
//delete product
app.use("/", require("./routes/product/deleteProduct"));

// auth
//register
app.use("/", require("./routes/auth/register"));
//login
app.use("/", require("./routes/auth/login"));
app.listen(PORT, console.log(`listenning on port ${PORT}`));



