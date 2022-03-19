const express = require('express');
const app = express();
const port = 8080;
const db = require('./model/db');
const axios = require('axios');
// const indexRouter = require('./routes/index');
// const pagesRouter = require('./routes/pages');
// const loginRouter = require('./routes/login');
var template = require('./template/index.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require("express-session");
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore({}, db);
var flash = require('connect-flash');
const bcrypt = require('bcrypt');
const { Axios } = require('axios');
const saltRounds = 10;

app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true;
app.use(flash());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
	key: 'connect.sid',
	secret: 'fadasdfh#$^&jk252353',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.username);
});
passport.deserializeUser(function(id, done) {
  db.query(`SELECT * FROM users WHERE username=?`,[id], function (err, results) {
    if(err){
      done(null, false)
    } else {
      done(null, id);
    }
    })
});

passport.use(new LocalStrategy(
  
  function(username, password, done) {
    db.query(`SELECT * FROM users WHERE username =?`, [username], function (err, results) {
      var user = results[0];
     if(!user){
       return done(null, false, { message: '아이디를 찾을 수 없습니다.' })
     } else if(!bcrypt.compareSync(password, user.password)) {       
          return done(null, false,{ message: '비밀번호가 틀렸습니다.' })        
     } else {
      return done(null, user)
     } 
    });
  }
));



app.get('/template', function (req, res) {
  res.render('index',{
    title: 'template',
    message: 'hello wolrd',
    time: Date()
  });
});

app.get('/login',(req, res) => {res.render('login')});



app.get('/board', (req, res) => {
	db.query('SELECT * FROM topic', (err, results) =>
	{var sql = `SELECT topic.id, topic.title, DATE_FORMAT(topic.created, '%Y-%m-%d') AS created, users.nickname FROM topic LEFT JOIN users ON topic.user_id = users.id  ORDER BY topic.id DESC LIMIT ? OFFSET ?`;
		db.query(sql, [10, 0], (err, results) =>{
			res.render('board',{results});
		});
	});
});



app.get('/', (req, res) => {
  res.render('index');
})

app.get('/create', function (req, res) {
  if(!template.ISOWNER(req, res)){
    res.redirect('/login')
  } else { 
    var title = '글쓰기';
    var login = template.LOGIN(req, res)
    var html = template.HTML(title, '',`
        <form class="form" method="post" action="/create_process">
          <input type="hidden" name="user_id" value='${req.user}'>
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
    res.send(html);}
})

app.get('/page/:pageId', function (req, res) {
  var sql = `SELECT topic.id, title, description, nickname FROM topic LEFT JOIN users ON topic.user_id = users.id WHERE topic.id=?`;
  db.query(sql,[req.params.pageId],function (err, results) {
      if(err){
          throw err;
      }
      var title = results[0].title;
      var login = template.LOGIN(req, res)
      var description = results[0].description;
      var html = template.HTML(title, `${results[0].nickname}`, `
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

app.get('/update/:updateId', function (req, res) {
  if(!template.ISOWNER(req, res)){
    res.redirect('/login')
  } else {
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
  }
});


// var offset = (pageNum -1)*limit;
// // var sql = 'SELECT * FROM topic LIMIT'+limit+'OFFSET'+offset;
// var sql = 'SELECT topic.id, title, topic.created, nickname FROM topic LEFT JOIN users ON topic.user_id = users.id LIMIT'+limit+'OFFSET'+offset;

// app.get('boared/:pageId', (req,res) => {
// 	var	sql = 'SELECT * FROM topic';
// 	db.query(sql, function(err, results) {
// 		console.log(req.params.pageId);
// 		var postNum = results.length
// 		var	limit = 10;
// 		// var	listNum = Math.ceil(postNum/limit)
//     var pageNum = Number(req.params.pageId);
//     var offset = (pageNum -1)*limit;
// 		var sql = `SELECT topic.id, topic.title, DATE_FORMAT(topic.created, '%Y-%m-%d') AS created, users.nickname FROM topic LEFT JOIN users ON topic.user_id = users.id  ORDER BY topic.id DESC LIMIT ? OFFSET ?`;
// 		db.query(sql, [limit, offset], function(err, results)	
// 		{ 
// 				res.render('board',{
// 					id: results[0].id,
// 					title: results[0].id,
// 					created: results[0].created,
// 					nickname: results[0].nickname
// 				})
// 			}
// 	)})
// })

// app.get('/board/:pageId', (req, res) => {
//   var sql = 'SELECT * FROM topic';
//   db.query(sql, function (err, results) {
//     var postNum = results.length
//     var limit = 10;
//     var listNum = Math.ceil(postNum/limit)
//     var pageNum = Number(req.params.pageId);
//     var offset = (pageNum -1)*limit;
//     var sql = `SELECT topic.id, topic.title, DATE_FORMAT(topic.created, '%Y-%m-%d') AS created, users.nickname FROM topic LEFT JOIN users ON topic.user_id = users.id  ORDER BY topic.id DESC LIMIT ? OFFSET ?`;
//     db.query(sql, [limit, offset], function (err, results) {
// 			console.log(results);
//         var title = '글목록';
//         var control = template.LISTCONTROL(listNum,pageNum);
//         var login = template.LOGIN(req, res)
//         console.log(results);
//         var table = template.BOARD(results);
//         var html = template.HTML(title, table, control , '',login); 
//         res.send(html);
//     })
//   })
// })

app.post('/create_process', function (req, res) {
  var post = req.body;
  db.query(`SELECT * FROM users WHERE username=?`,[post.user_id], function (err, results) {
    var usersID = results[0].id;
    var sql = `INSERT INTO topic (title, description, created, user_id) 
    VALUES(?, ?, NOW(), ?)`
    db.query(sql, [post.title, post.description, usersID], 
      function(err, results){  
        res.redirect(`/board/1`);
    });
  })
})

app.post('/update_process', function (req, res,) {
  var post = req.body;
  db.query(`UPDATE topic SET title=?, description=? WHERE id=?`, [post.title, post.description, post.id],function(err, results){
      if(err){
          throw err;
      }     
      res.redirect(`/board/1`);
  });
});

app.post('/delete_process', function (req, res) {
  if(!template.ISOWNER(req, res)){
    res.redirect('/login')
  } else {
    var post = req.body;
    db.query(`DELETE FROM topic WHERE id = ?`, [post.id], function (err, results) {
        if(err){
            throw err;
        }
        res.redirect('/board/1')
    })
  }
})
app.get('/login',(req, res) =>{
  var fmsg = req.flash();
  var feedback = '';
  if(fmsg.error){
    feedback = fmsg.error[0];
  }
  var title = '로그인';
  var login = template.LOGIN(req, res)
  var html = template.HTML(title, feedback,`
    <a href="/login/resister">회원가입</a>
    
    <form action="/login" method="post">
      <div>
          <label for="username">Username</label>
          <input id="username" name="username" type="text" autocomplete="username" required />
					
      </div>
      <div>
          <label for="current-password">Password</label>
          <input id="current-password" name="password" type="password" autocomplete="current-password" required />
      </div>
      <div>
          <button type="submit">Sign in</button>
      </div>
    </form>`,'',login);     
  res.send(html)
});

app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);

app.get('/logout', function (req, res) {
  req.logOut();
  req.session.save(function () {
    res.redirect('/');
  })
})

app.get('/login/resister', function(req, res){
    var title = '회원가입';
    var login = template.LOGIN(req, res);
    var html = template.HTML(title,`
    <form action="/login/resister" method="post">
        <div>
            <label for="username">Username</label>
            <input name="username" type="text" autocomplete="username" required />
        </div>
        <div>
            <label for="current-password">Password</label>
            <input name="password" type="password" autocomplete="current-password" required />
        </div>
        <div>
            <label for="nickname">nickname</label>
            <input name="nickname" type="text" autocomplete="nickname" required />
        </div>
        <div>
            <button type="submit">Sign in</button>
        </div>
    </form>`,'','',login);
    res.send(html);
});


app.post('/login/resister', (req, res) =>{
    var post = req.body;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(post.password, salt, function(err, hash) {
        db.query(`INSERT INTO users (username, password, nickname, created) VALUES (?, ?, ?, NOW())`,[post.username, hash, post.nickname], function (err, results) {
          var user = post;
          if(err){   
            res.sendStatus(500);
          } else{
            req.login(user, function (err) {
              req.session.save(function () {
                res.redirect('/');
                })
              })
          }
        })
      });     
    });
});

  




// app.get('/login', loginRouter);
// app.post('/login', loginRouter);
// app.get('/login/resister', loginRouter);
// app.post('/login/resister', loginRouter);
// app.get('/logout', loginRouter)
// app.get('*', indexRouter);
// app.post('*', pagesRouter);


app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});



app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})