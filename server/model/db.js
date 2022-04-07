var mysql = require("mysql");
var db = mysql.createConnection({
  host: "3.34.189.123",
  user: "dotolee",
  password: "111111",
  database: "dotolee",
});

db.connect();
module.exports = db;
