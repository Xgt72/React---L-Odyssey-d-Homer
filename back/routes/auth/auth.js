const { Router } = require('express');
const router = Router();
const connection = require("../../helpers/db.js");

router.post("/signup", (req, res, next) => {
    const user = req.body;
    connection.query("INSERT INTO users SET ?", user, (err, results) => {
        if (err) {
            res.status(500).json({flash: err.message});
        } else {
            res.status(200).json({flash: "User has been signed up!"});
        }
    });
});

module.exports = router;