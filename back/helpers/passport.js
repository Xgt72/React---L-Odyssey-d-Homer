const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const connection = require("./db.js");
const bcrypt = require("bcrypt");
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function (email, password, cb) {

        connection.query("SELECT password, firstname, lastname FROM users WHERE email = ?", email, (err, results) => {
            if (err) {
                return cb(err);
            } else {
                if (results[0] == undefined) {
                    return cb(null, false, { message: 'Incorrect email.' });
                } else {
                    if (bcrypt.compareSync("homer" + password, results[0].password)) {
                        const user = {
                            email: email
                        };
                        return cb(null, user, { message: 'User sign in!' });
                    } else {
                        return cb(null, false, { message: 'Incorrect password.' });
                    }
                }
            }
        });
    }
));

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "homerS"
    },
    function(jwtPayload, cb) {
        return cb(null, jwtPayload);
    }
));

module.exports = passport;