const {db} = require("../Connect");
const {DataTypes} = require("sequelize");
const {v4 : uuid} = require("uuid");
const bcrypt = require("bcrypt");
const register = db.define("users", {
    
    user_id: {
        type : DataTypes.STRING,
        allowNull : false
    },
    name : {
        type: DataTypes.STRING,
        allowNull : false
    },
    username: {
        type : DataTypes.STRING,
        allowNull : false,
    },
    password : {
        type: DataTypes.STRING,
        allowNull : false
    }
});

  
async function insertUser(name, username, password){
    db.sync()
    const hashPassword = await bcrypt.hash(password,10);
    console.log(hashPassword);

    register.create({user_id : uuid(), name, username,password: hashPassword})
    .then(res => {
        console.log("user inserted successfully !",res);
        
    }).catch(err => {
        console.log(err)
    })
}

module.exports.insertUser = insertUser;