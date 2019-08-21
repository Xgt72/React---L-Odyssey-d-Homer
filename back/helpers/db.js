const mysql = require("mysql");
const connection = mysql.createConnection({
    host : "localhost",
    user : "root", // your username
    password : "passsword", // your password
    database : "react" // your database
});

module.exports = connection;