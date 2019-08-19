const { Router } = require('express');
const router = Router();
const connection = require("../../helpers/db.js");

router.post("/signup", (req, res, next) => {
    const user = req.body;
    connection.query("INSERT INTO users SET ?", user, (err, results) => {
        if (err) {
            res.status(500).send("Error while backing up the user");
        } else {
            res.json(results);
        }
    });
});

module.exports = router;