require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
// const {addProduct} = require("./database/models/new.product");
const {addProduct} = require("./database/models/newProduct")
const expressRateLimit = require("express-rate-limit");
const {v4 : uuid} = require("uuid");
const { db } = require("./database/Connect");
const app = express();
const PORT = process.env.PORT || 4000;




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

 
app.get("/createDB", (req, res) => { 
    const query = "CREATE DATABASE ecommers_website";
    DB.query(query, (err, result) => {
        if(err) throw err
        res.send("database created");
    })
});

 
app.get("/rateLimit", limitApiCall, (req, res) => {
    res.send("sup");
})


app.get("/image/:id", (req, res) => {
    const {id} = req.params;
    const query = `Select fileData From products Where fileName=${id}`;
    db.query(query, (err, result) => {
        if(err) throw err
        console.log(result);
        res.send(result);
    })
})  

app.post("/api/new-product", (req, res) => {
    const {productName} = req.body;
    const {productDesc} = req.body;
    const {fileData} = req.body;
    const {fileName} = req.body;
    const {visible} = req.body;
    const {price} = req.body;
    console.log(req.body);
    const newFileName = uuid() + fileName.slice(-5);
    addProduct(productName, price, visible, productDesc, fileData, newFileName);
    res.json({ imgUrl : newFileName});
})  
 
app.listen(PORT, console.log(`listenning on port ${PORT}`));
