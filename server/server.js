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
  

app.get("/api/products", (req, res) => {
    const query = "select * FROM products";

    makeQuery.query(query, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send(result)
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
});
 
app.get("/get-product/:key", (req, res) => {
    const {key} = req.params;
    console.log("*".repeat(30),key);
    const query = "SELECT * FROM products where product_id= ?";
            
    makeQuery.query(query,key, (err, result) => {
        if(err) throw err

        const b64 = Buffer.from(result[0].fileData).toString("base64");
        const extention = path.extname(result[0].fileName);
        console.log(extention)
        const image = `data:image/${extention.slice(1)};base64,${b64}`;
       // result[0].fileData = image;
        console.log(result[0]);
        res.send(result[0]);
    })
}) 


app.delete("/delete-product/:product_id", (req, res) => {
    const {product_id} = req.params;
    const query = "DELETE FROM products WHERE product_id=?";
    makeQuery.query(query,product_id, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("product deleted successfully!");
    } )
})

app.put("/update-product/:product_id", (req, res) => {
    const {product_id} = req.params;
    const {name} = req.body;
    const {price} = req.body;
    const {description} = req.body;
    const {visible} = req.body;
    const {fileData} = req.body;
    console.log("put ".repeat(40))
    const query = "UPDATE products SET name=? , price=?, description=?, visible=? WHERE product_id=?";

    const variables = [name, price, description, visible, product_id];
    makeQuery.query(query, variables, (err, result) => {
        if (err) throw err
        console.log(result);
        res.send(result);
    })
})
  
app.listen(PORT, console.log(`listenning on port ${PORT}`));
