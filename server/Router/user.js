const express = require("express");
const router = express.Router();
const db = require("../model/db.js");
const path = require("path");
// 로그인 관련 모듈
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// 이미지 업로드
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/profile");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 로그인 로그아웃 라우터
router.post("/login", async function (req, res, next) {
  await passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(404).json(info);
    req.logIn(user, function (err) {
      console.log(req.user);
      if (err) return next(err);
      return res.json(req.user);
    });
  })(req, res, next);
});
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.clearCookie("connect.mysql.sid");
  });
});
// 회원가입 라우터
router.post("/resister", (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      const sql = `INSERT INTO users (username, password, nickname, created) VALUES (?, ?, ?, NOW())`;
      db.query(
        sql,
        [req.body.username, hash, req.body.nickname],
        (err, user) => {
          if (!user) return res.status(404).json("이미 존재하는 ID입니다.");
          if (err) return err;
          const sql = `SELECT * FROM users WHERE username=?`;
          db.query(sql, [req.body.username], (err, results) => {
            if (err) {
              res.sendStatus(500);
            } else {
              var user = results[0];
              req.logIn(user, function (err) {
                if (err) return next(err);
                return res.send(req.user);
              });
            }
          });
        }
      );
    });
  });
});
// 프로필 라우터
router.post("/profile", upload.single("profile_image"), function (req, res) {
  const profile_image = req.file.filename;
  const update_sql = `UPDATE users SET image=? WHERE id=?`;
  db.query(update_sql, [profile_image, req.user], function (err, results) {
    if (err) throw err;
  });
  res.send({
    fileName: req.file.filename,
  });
});
router.put("/profile", (req, res) => {
  const sql = `SELECT * FROM users WHERE username=?`;
  db.query(sql, [req.body.username], (err, results) => {
    if (err) return err;
    if (results) {
      bcrypt.compare(req.body.password, results[0].password, (err, results) => {
        if (results) {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
              const sql = `UPDATE users SET password=?,nickname=? WHERE username=?`;
              db.query(
                sql,
                [hash, req.body.nickname, req.body.username],
                (err, results) => {
                  if (err) return err;
                  const sql = `SELECT * FROM users WHERE username=?`;
                  db.query(sql, [req.body.username], (err, results) => {
                    if (err) return err;
                    const user = results[0];
                    res.send(user);
                  });
                }
              );
            });
          });
        } else {
          return res.status(404).send("비밀번호가 틀렸습니다.");
        }
      });
    }
  });
});

module.exports = router;
