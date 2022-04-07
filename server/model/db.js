var mysql = require("mysql");
var db = mysql.createConnection({
  host: "52.78.43.223",
  user: "dotolee",
  password: "111111",
  database: "dotolee",
});

db.connect();
module.exports = db;
