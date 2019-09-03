const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const authRouter = require("./routes/auth/auth");
const passport = require("./helpers/passport.js");
const connection = require("./helpers/db.js");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/auth", authRouter);

app.get("/profile", passport.authenticate('jwt', { session: false }), function (req, res) {
    connection.query("SELECT email, firstname, lastname FROM users WHERE email = ?", req.user.email,
        (err, results) => {
            const user = {
                email: results[0].email,
                name: results[0].firstname,
                lastname: results[0].lastname
            }
            console.log("user: ", user);
            res.json(user);
        }
    );
});

app.get("/", (req, res) => {
    res.send("youhou");
});

app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

let server = app.listen(process.env.PORT || 5000, function () {
    console.log("Listening on port " + server.address().port);
});