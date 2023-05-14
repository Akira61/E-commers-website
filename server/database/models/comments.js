const {db} = require("../Connect");
const {DataTypes} = require("sequelize");
const {v4 : uuid} = require("uuid");
const bcrypt = require("bcrypt");
const { makeQuery } = require("../../server");
const Comment = db.define("comments", {
    
    comment_id: {
        type : DataTypes.STRING,
        allowNull : false
    },
    comment : {
        type: DataTypes.STRING,
        allowNull : false
    },
    visible: {
        type : DataTypes.BOOLEAN,
        allowNull : false,
    },
    product_id : {
        type: DataTypes.INTEGER,
        allowNull : false
    },
    user_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
});

async function insertComment(comment, visible, product_id,user_id){

    //foriegn key
    // const query = `
    // ALTER TABLE comments
    // ADD  CONSTRAINT user
    // FOREIGN KEY(user_id) REFERENCES users(id)
    // ON UPDATE CASCADE
    // ON DELETE CASCADE;
    // ALTER TABLE comments
    // ADD  CONSTRAINT product
    // FOREIGN KEY(product_id) REFERENCES products(id)
    // ON UPDATE CASCADE
    // ON DELETE CASCADE;
    // `
    // makeQuery.query(query, (err, result) => {
    //     if(err) throw err;
    //     console.log("FOREIGN key created")
    //     console.log(result)
    // });
    
    db.sync()
    Comment.create({
        comment_id : uuid(),
        comment: comment,
        visible : visible,
        product_id : product_id,
        user_id : user_id})

    .then(res => {
        console.log("user inserted successfully !",res);
        
    }).catch(err => {
        console.log(err)
    })
} 

module.exports.inserComment = insertComment;
module.exports.Comment = Comment;