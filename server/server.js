require("dotenv").config();
const express = require("express");
const session = require("express-session");
const fileupload = require("express-fileupload")
const { adminRole } = require("./config/checkRole");
const { loggedIn } = require("./config/checkRole");
const mysqlStore = require("express-mysql-session")(session);
const cors = require("cors");
const mysql = require("mysql");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const { addProduct } = require("./database/models/newProduct");
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
app.use(cors({origin: ['http://localhost:3000'],optionsSuccessStatus: 200,credentials: true,}));


//***************session******************
const sessionStore = new mysqlStore(sqlOptions);
app.use(session({
    secret : process.env.session_secret,
    resave : false,
    //to prevent setting a new session every time
    saveUninitialized : true,
    cookie : {
         // 14 days
        maxAge :  14 * 24 * 3600000,
        httpOnly: true,
    },
    store : sessionStore,
}))
module.exports.session = session;


// ************************Routes**************************

//check request role
app.get("/check-role", adminRole, (req, res) => {
    const { role } = req.session;
    // if(role !== 'admin'){
    //    return res.status(401).send("you don't have a pormision")
    // }
    console.log("^".repeat(30),req.session.role);
    res.send(req.session.role);
})

 
app.get("/image/:id", (req, res) => {
    const {id} = req.params;
    console.log(id)
    const query = "Select * From products where fileName=?";
    makeQuery.query(query,id,(err, result) => {
        if(err) throw err
        // console.log(result);
        // console.log(result[0].fileData);
        res.sendFile(`../client/public/uploads/${result[0].fileName}`);
        //res.send(result[0].fileData);
    })
})    
 
//get all products / single product
app.use("/", require("./routes/product/getProduct"));
// add product
app.use("/", require("./routes/product/postProduct"));
//update product
app.use("/", require("./routes/product/updateProduct"));
//delete product
app.use("/",adminRole, require("./routes/product/deleteProduct"));
 
// auth
//register
app.use("/", require("./routes/auth/register"));
//login
app.use("/", require("./routes/auth/login"));


app.listen(PORT, console.log(`listenning on port ${PORT}`));



