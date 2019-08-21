const { Router } = require('express');
const router = Router();
const connection = require("../../helpers/db.js");
const bcrypt = require("bcrypt");
const passport = require("../../helpers/passport.js");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync("homer" + user.password , 10);
    connection.query("INSERT INTO users SET ?", user, (err, results) => {
        if (err) {
            res.status(500).json({flash: err.message});
        } else {
            res.status(200).json({flash: "User has been signed up!"});
        }
    });
});

router.post("/signin", (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.status(400).json({message: info.message});
        }
        const token = jwt.sign(user, 'homerS', { expiresIn: 60 * 5 });
        return res.json({user, token});
    })(req, res);
});



module.exports = router;