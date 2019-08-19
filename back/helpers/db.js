const mysql = require("mysql");
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Xgt72@web-dev!",
    database : "react"
});

module.exports = connection;