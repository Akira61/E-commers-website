const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../database/models/register");
const {makeQuery} = require("../server");
const bcrypt = require("bcrypt");


module.exports = function(passport){

    passport.use(
        new LocalStrategy(
        {usernameField : 'username'},
        (username, password, done) => {
            
            //databse check user
            const query = "SELECT * from users where username=?";
            makeQuery.query(query, username, async (err, user) => {
                if(err) throw err;

                // check user exsisting
                if(user.length == 0){
                    console.log("user not found");
                    return done(null, false, {message :"user not found"});
                };

                //compare hashed password
                const compare = await bcrypt.compare(password, user[0].password);
                if(!compare){
                    console.log("uncoorect password");
                    done(null, false, {message : "uncorrect password"});
                }
                console.log("user logged in successfuly!");
                return done(null,user);
            })
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
});

}