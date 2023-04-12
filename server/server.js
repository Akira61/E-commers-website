require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
// const {addProduct} = require("./database/models/new.product");
const {addProduct} = require("./database/models/newProduct")
const expressRateLimit = require("express-rate-limit");
const {v4 : uuid} = require("uuid");
const { db } = require("./database/Connect");
const app = express();
const PORT = process.env.PORT || 4000;


//database query config (we initilze database and rows with sequelize and we query data with mysql)
const makeQuery = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    database : process.env.MYSQL_DBNAME,
    user : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
})
module.exports.makeQuery = makeQuery;

// Middlwares
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: "*"}));

// limit api request
const limitApiCall = expressRateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
	max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


 
app.get("/rateLimit", limitApiCall, (req, res) => {
    res.send("sup");
})
  

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
  
// ************************Routes**************************

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



