require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const fileupload = require("express-fileupload")
const { adminRole } = require("./config/checkRole");
const { loggedIn } = require("./config/checkRole");
const mysqlStore = require("express-mysql-session")(session);
const cors = require("cors");
const {v4 : uuid} = require("uuid");
const mysql = require("mysql");
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
app.use(helmet());


//***************session******************
const sessionStore = new mysqlStore(sqlOptions);
app.use(session({
    secret : process.env.session_secret,
    resave : false,
    //to prevent setting a new session every time
    saveUninitialized : false,
    cookie : {
         // 14 days
        maxAge :  14 * 24 * 3600000,
        // turn them on when you done from developing enviromant for security resonse
        // httpOnly: true, 
        // secure : true,
    },
    store : sessionStore,
}))
module.exports.session = session;


// ************************Routes**************************

//check request role
app.get("/check-role", (req, res) => {
    const { role } = req.session;
    // if(role !== 'admin'){
    //    return res.status(401).send("you don't have a pormision")
    // }
    let isAdmin = false;
    if(role){
        if(role !== 'user'){
            isAdmin = true;
        }
    }
    console.log("^".repeat(30),role);
    res.json({role,isAdmin});
})
 
//user's id
app.get("/userID",loggedIn,(req, res) => {

    const user = req.session.user.user_id;
    res.send(user);
});

// // set csrf token
// app.get("/set-csrfToken", (req, res) => {
    
//         if(req.session.csrfToken) return res.send(req.session.csrfToken)// user already have an token
//         // const csrfToken = uuid();
//         // req.session.csrfToken = csrfToken;
//         // res.send(csrfToken);
//         // return;
    
// })

app.get("/user?id");


app.get("/image/:id", (req, res) => {
    const {id} = req.params;
    console.log(id)
    const query = "Select fileName From products where fileName=?";
    makeQuery.query(query,id,(err, result) => {
        if(err) throw err
        console.log(result);
        // console.log(result[0].fileData);
        res.sendFile(`../client/public/uploads/${result[0].fileName}`);
        //res.send(result[0].fileData);
    })
}) 


 
//products
    //get all products / single product
    app.use("/", require("./routes/admin/product/getProduct"));
    // add product
    app.use("/", require("./routes/admin/product/postProduct"));
    //update product
    app.use("/", require("./routes/admin/product/updateProduct"));
    //delete product
    app.use("/", require("./routes/admin/product/deleteProduct"));
//


// auth
    //register
    app.use("/", require("./routes/auth/register"));
    //login
    app.use("/", require("./routes/auth/login"));
    //logout
    app.use("/", require("./routes/auth/logout"));
//


//edit user profile
app.use("/", require("./routes/user/edit.profile"));

// edit user password
app.use("/", require("./routes/user/edit.password"));

//get last add users in the database
app.use("/", require("./routes/user/lastUsersAdded"));

// staff
    //add new staff member
    app.use("/", require("./routes/admin/staff/add.member"));
    // get all staff info / one member info
    app.use("/", require("./routes/admin/staff/get.members"));
    //edit member info
    app.use("/", require('./routes/admin/staff/edit.member'));
    //delete Member :(
    app.use("/", require("./routes/admin/staff/delete.member"));
//


// Categories
    //add new category
    app.use("/", require("./routes/admin/categories/new.category"));
    //get categories
    app.use("/", require("./routes/admin/categories/get.categories"));
    //Edit categories
    app.use("/", require("./routes/admin/categories/edit.categories"));
    //Delete Category
    app.use("/", require("./routes/admin/categories/delete.category"))

//


app.listen(PORT, console.log(`listenning on port ${PORT}`));



