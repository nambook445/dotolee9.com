const express = require("express");
const app = express();
const port = 8080;
const db = require("./model/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MySQLStore = require("express-mysql-session")(session);
const sessionStore = new MySQLStore({}, db);
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const cors = require("cors");
const api = require("./Router/api");
const user = require("./Router/user");

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.set("view engine", "pug");
app.set("views", "./views");
app.locals.pretty = true;
app.use(flash());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: "connect.mysql.sid",
    secret: "fadasdfh#$^&jk252353",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  db.query(`SELECT * FROM users WHERE id=?`, [id], (err, results) => {
    if (err) {
      done(null, false);
    } else {
      done(null, id);
    }
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    db.query(
      `SELECT * FROM users WHERE username =?`,
      [username],
      (err, results) => {
        var user = results[0];
        if (!user) {
          return done(null, false, { message: "아이디를 찾을 수 없습니다." });
        } else if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "비밀번호가 틀렸습니다." });
        } else {
          return done(null, user);
        }
      }
    );
  })
);

app.use("/api", api, (req, res) => {});
app.use("/user", user, (req, res) => {});

app.use((req, res, next) => {
  res.status(404).send("Sorry cant find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
