var mysql = require("mysql");
var db = mysql.createConnection({
  host: "3.38.59.97",
  user: "dotolee",
  password: "111111",
  database: "dotolee",
});

db.connect();
module.exports = db;
