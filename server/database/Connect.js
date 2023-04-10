
const {Sequelize} = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
    process.env.MYSQL_DBNAME,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    {
        dialect : "mysql",
        host : process.env.MYSQL_HOST,
       
    }
);
 
 
module.exports.db = db;