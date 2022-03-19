const express = require("express");
const router = express.Router();
const db = require("../model/db.js");
const fs = require("fs");
const multer = require("multer"); // 이미지 업로드
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/post"); // './public/images/' directory name where save the file
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

router.get("/", (req, res) => {
  const sql = `SELECT topic.id, topic.title, topic.description, DATE_FORMAT(topic.created, '%Y-%m-%d') AS created, topic.image, users.nickname, users.image AS profile FROM topic LEFT JOIN users ON topic.user_id = users.id ORDER BY topic.id DESC `;
  db.query(sql, (err, results) => {
    const data = results;
    res.json(data);
  });
});

router.post("/topic", (req, res) => {
  const sql = `SELECT topic.id, topic.title, topic.description, DATE_FORMAT(topic.created, '%Y-%m-%d') AS created, topic.image, users.nickname, users.image AS profile FROM topic LEFT JOIN users ON topic.user_id = users.id WHERE topic.id=? `;
  db.query(sql, [req.body.id], (err, results) => {
    const data = results;
    res.json(data);
  });
});

// router.post(
//   "/post_image",
//   upload.single("post_image"),
//   function (req, res, next) {
//     console.log(req);
//     console.log(req.file);
//     const post_image = req.file.filename;
//     const update_sql = `UPDATE topic SET image=? WHERE id=?`;
//     db.query(update_sql, [post_image, req.user], function (err, results) {
//       if (err) throw err;
//     });
//     res.json({
//       fileName: req.file.filename,
//     });
//   }
// );

router.post("/paper", upload.single("post_image"), (req, res) => {
  if (req.file) {
    const imageSql = `INSERT INTO topic (title, description, created, user_id, image) VALUES(?, ?, NOW(), ?, ?)`;
    db.query(
      imageSql,
      [req.body.title, req.body.description, req.user, req.file.filename],
      (err, results) => {
        if (err) throw err;
        res.status(200).json("ok");
      }
    );
  } else {
    const textSql = `INSERT INTO topic (title, description, created, user_id) VALUES(?, ?, NOW(), ?)`;
    db.query(
      textSql,
      [req.body.title, req.body.description, req.user],
      (err, results) => {
        if (err) throw err;
        res.status(200).json("ok");
      }
    );
  }
});

// 청소를 잘하자 진짜 어지러우니까
router.put("/topic", upload.single("post_image"), (req, res) => {
  console.log(req.body);
  if (req.body.post_image == "null") {
    const sql = `UPDATE topic SET title=?, description=? WHERE id=?`;
    db.query(
      sql,
      [req.body.title, req.body.description, Number(req.body.id)],
      (err, results) => {
        res.status(200).send("ok");
      }
    );
  } else if (req.file.filename) {
    console.log("너가 왜나와");
    const sql = `UPDATE topic SET title=?, description=?, image=? WHERE id=?`;
    db.query(
      sql,
      [
        req.body.title,
        req.body.description,
        req.file.filename,
        Number(req.body.id),
      ],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send("ok");
      }
    );
    fs.unlink(
      `public/images/post/${req.body.imageFileNameFromServer}`,
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${req.body.imageFileNameFromServer}을 삭제하였습니다.`);
        }
      }
    );
  }
});

router.delete("/", (req, res) => {
  const sql = `DELETE FROM topic WHERE id = ?`;
  db.query(sql, [req.body.id], (err, results) => {
    if (err) {
      throw err;
    }
    res.send("ok");
  });
});

module.exports = router;
