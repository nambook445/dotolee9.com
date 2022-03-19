var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kcmd53113',
  database : 'dotolee'
});

db.connect();
module.exports = db;

