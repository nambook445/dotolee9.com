var express = require('express');
var router = express.Router();
var template = require('../template/index.js');
var db = require('../model/db');

const app = express();
var cookieParser = require('cookie-parser')
var session = require("express-session");
var passport = require('passport')
var LocalStrategy = require('passport-local').      Strategy;
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore({}, db);
var bodyParser = require('body-parser');


app.use(cookieParser())
app.use(session({
	key: 'session_cookie_name',
	secret: 'fadasdfh#$^&jk252353',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
passport.deserializeUser(function(id, done) {
db.query(`SELCET * FROM users WHERE username=?`,[id], function (err, results) {
    if(err){
    done(null, false);
    } else {
    done(null, results[0]);
    }
    });
    
});





router.get('/', (req, res) => {
    console.log('/', req.user);
    
      var title = '마감일기';
      var login = template.LOGIN(req, res)
      var html = template.HTML(title, '', '', '',login);
      res.send(html);
 
})

router.get('/create', function (req, res) {
  var title = '글쓰기';
  var login = template.LOGIN(req, res)
  var html = template.HTML(title, '',`
      <form class="form" method="post" action="/create_process">
          <input class="title" type="text" name="title" placeholder="title">
          <textarea id="summernote" name="description"></textarea>
          <script>
              $(document).ready(function() {
                  $('#summernote').summernote({
                  lang: 'ko-KR' // default: 'en-US'
                  });
              });
          </script>                     
          <p><input type="submit" value="마감"></p>  
      </form>
  `,'',login); 
  res.send(html);
})

router.get('/page/:pageId', function (req, res) {
  db.query(`SELECT * FROM topic WHERE id=?`,[req.params.pageId],function (err, results) {
      if(err){
          throw err;
      }
      var title = results[0].title;
      var login = template.LOGIN(req, res)
      var description = results[0].description;
      var html = template.HTML(title, '', `
      <form class="form" method="post" action="/create_process">
          <input class="title" type="text" name="title" placeholder="title" value="${title}">
          <textarea id="summernote" name="description">${description}</textarea>
          <script>
              $(document).ready(function() {
                  $('#summernote').summernote({
                  lang: 'ko-KR' // default: 'en-US'
                  });
              });
          </script>                     
          <p><input type="submit" value="마감"></p>  
      </form>
      <a href="/update/${req.params.pageId}">update</a>
      `,
        ` 
      <p>
      <form method="post" action="/delete_process">
      <input type="hidden" name="id" value="${req.params.pageId}">
      <input type="submit" value="delete">
      </form>`
      ,login); 
          res.send(html);        
  });
});

router.get('/update/:updateId', function (req, res) {
  db.query(`SELECT * FROM topic WHERE id=?`,[req.params.updateId],function (err, results) {
    if(err){
        throw err;
    }
    var title = results[0].title;
    var login = template.LOGIN(req, res)
    var description = results[0].description;
    var html = template.HTML(title, '', `
      <form class="form" method="post" action="/update_process">
          <input type="hidden" name="id" value="${results[0].id}"> 
          <input class="title" type="text" name="title" placeholder="title" value="${title}">
          <textarea id="summernote" name="description">${description}</textarea>
          <script>
              $(document).ready(function() {
                  $('#summernote').summernote({
                  lang: 'ko-KR' // default: 'en-US'
                  });
              });
          </script>                     
          <p><input type="submit" value="마감"></p>  
      </form>
      `,`
      <p>
      <form method="post" action="/delete_process">
          <input type="hidden" name="id" value="${results[0].id}">
          <input type="submit" value="delete">
      </form>
      </p>`,login); 
      res.send(html);

  });
});

router.get('/board', (req, res,) => {
  db.query(`SELECT * FROM topic`, function (err, results) {
      var title = '글목록';
      var login = template.LOGIN(req, res)
      var table = template.TABLE(results);
      var html = template.HTML(title, '', table,'',login); 
      res.send(html);
      })
  })

  
module.exports = router;