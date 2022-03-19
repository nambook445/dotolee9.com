var express = require('express');
var router = express.Router();
var db = require('../model/db');

router.post('/create_process', function (req, res,) {
  var post = req.body;
  db.query(`INSERT INTO topic (title, description, created, author_id) 
          VALUES(?, ?, NOW(), ?)`,
          [post.title, post.description, 1], 
          function(err, results){  
          res.redirect(`/board`);
  });
})

router.post('/update_process', function (req, res,) {
  var post = req.body;
  db.query('UPDATE topic SET title=?, description=?, author_id=1 WHERE id=?', [post.title, post.description, post.id],function(err, results){
      if(err){
          throw err;
      }     
      res.redirect(`/board`);
  });
});

router.post('/delete_process', function (req, res) {
  var post = req.body;
  db.query(`DELETE FROM topic WHERE id = ?`, [post.id], function (err, results) {
      if(err){
          throw err;
      }
      res.redirect('/board')
  })
})

module.exports = router;
