var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "dotolee",
  password: "111111",
  database: "dotolee",
});

db.connect();
module.exports = db;
