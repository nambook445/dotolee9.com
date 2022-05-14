const express = require("express");
const router = express.Router();
const db = require("../model/db.js");
const path = require("path");
//이미지 업로드 관련 모듈
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/post");
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
// 블로그 라우터
router.get("/blog", (req, res) => {
  const sql = `SELECT topic.id, topic.title, topic.description, DATE_FORMAT(topic.created, '%Y-%m-%d') AS created, topic.image, users.nickname, users.image AS profile FROM topic LEFT JOIN users ON topic.user_id = users.id ORDER BY topic.id DESC `;
  db.query(sql, (err, results) => {
    const data = results;
    console.log(data)
    res.json(data);
  });
});
// 상세보기 라우터
router.get("/topic", (req, res) => {
  const sql = `SELECT * FROM topic WHERE user_id = ?`;
  db.query(sql, [req.query.id], (err, results) => {
    if (err) {
      throw err;
    }
    res.send({
      topic: results,
      length: results.length,
    });
  });
});
router.post("/topic", (req, res) => {
  const sql = `SELECT topic.id, topic.title, topic.description, DATE_FORMAT(topic.created, '%Y-%m-%d') AS created, topic.user_id, topic.image, users.nickname, users.image AS profile FROM topic LEFT JOIN users ON topic.user_id = users.id WHERE topic.id=? `;
  db.query(sql, [req.body.id], (err, results) => {
    const data = results;
    res.send(data);
  });
});
router.put("/topic", upload.single("post_image"), (req, res) => {
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
router.delete("/topic", (req, res) => {
  console.log(req.body);
  const sql = `DELETE FROM topic WHERE id = ?`;
  db.query(sql, [req.body.id], (err, results) => {
    if (err) {
      throw err;
    }
    res.send("ok");
  });
});
// 페이퍼 라우터
router.post("/paper", upload.single("post_image"), (req, res) => {
  if (req.file) {
    const imageSql = `INSERT INTO topic (title, description, created, user_id, image) VALUES(?, ?, NOW(), ?, ?)`;
    db.query(
      imageSql,
      [req.body.title, req.body.description, req.body.id, req.file.filename],
      (err, results) => {
        if (err) throw err;
        res.status(200).send("ok");
      }
    );
  } else {
    const textSql = `INSERT INTO topic (title, description, created, user_id) VALUES(?, ?, NOW(), ?)`;
    db.query(
      textSql,
      [req.body.title, req.body.description, req.body.id],
      (err, results) => {
        if (err) throw err;
        res.status(200).send("ok");
      }
    );
  }
});

module.exports = router;
