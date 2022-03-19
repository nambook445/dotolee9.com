var express = require('express');
const app = express();
var router = express.Router();
var template = require('../template/index.js');
var db = require('../model/db');
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


router.get('/login',(req, res) =>{
    var title = '로그인';
    var html = template.HTML(title, `
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
      </form>`,'','');     
    res.send(html)
});

passport.serializeUser(function(user, done) {
    console.log('serializeUser', user.username)
    done(null, user.username);
  });
passport.deserializeUser(function(id, done) {
db.query(`SELCET * FROM users WHERE username=?`,[id], function (err, results) {
    if(err){
    done(null, false);
    } else {
        console.log('deserializeUser',results[0].username)
    done(null, results[0].username);
    }
    });
    
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      db.query(`SELECT * FROM users WHERE username =?`, [username], function (err, results) {
        var user = results[0];
       if(!user){
        console.log('아이디를 찾을 수 없습니다')
         return done(null, false)
       } else if (user.password !== password){
        console.log('비번x')
        return done(null, false)
       } else{
        console.log('로그인성공')
        console.log(user);
        return done(null, user)
       }
      });
    }
));

router.post('/login',
    passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login' })
);


router.get('/login/resister', function(req, res){
    var title = '회원가입';
    var html = template.HTML(title,`
    <form action="/login/resister" method="post">
        <div>
            <label for="username">Username</label>
            <input id="username" name="username" type="text" autocomplete="username" required />
        </div>
        <div>
            <label for="current-password">Password</label>
            <input id="current-password" name="password" type="password" autocomplete="current-password" required />
        </div>
        <div>
            <label for="nickname">nickname</label>
            <input id="nickname" name="nickname" type="text" autocomplete="nickname" required />
        </div>
        <div>
            <button type="submit">Sign in</button>
        </div>
    </form>`,'','');
    res.send(html);
});

router.post('/login/resister', (req, res) =>{
    var post = req.body;
    db.query(`INSERT INTO users (username, password, nickname, created) VALUES (?, ?, ?, NOW())`,[post.username, post.password, post.nickname], function (err, results) {
        if(err){
            throw err;
        }req.login(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/users/' + req.user.username);
          });
      });
});

router.get('/logout', function (req, res) {
    console.log(req.user);
    req.logOut();
    res.send('ok');
  })

module.exports = router;