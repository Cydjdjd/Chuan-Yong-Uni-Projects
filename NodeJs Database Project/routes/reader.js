const express = require("express");
const router = express.Router();
const assert = require('assert');
const sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(bodyParser.json());
var db = new sqlite3.Database('database.db');
router.get("/homepage", (req, res) => {
    var titles=["Blogmaker","Have fun making blogs","Chuan Yong"];
    var tableTitles = ["BlogId", "Title", "SubTitle", "Created", "Last Modified", "Published", "Action","Likes"];
    var sql = `SELECT * FROM publishedData ORDER BY Published DESC`;
    db.serialize(function () {
        db.all(sql, [], (err, data) => {
            if (err) {
                throw err;
            }
            console.log(data);
            res.render("reader/homepage", { titles: titles, tableTitles: tableTitles, publishData: data, });
        });
    })

})

router.get("/share/:id", (req, res) => {
    var UserId = parseInt(req.params.id);
    var comments;
    var sql = `SELECT * FROM comments WHERE BlogId=${UserId}`;
    var sql2 = `SELECT BlogId,Title,Subtitle,ArticleText,Published,Likes FROM publishedData WHERE BlogId=${UserId}`;
    db.serialize(function () {
        db.all(sql, [], (err, data) => {
            if (err) {
                throw err;
            }
            comments = data;
        });
        db.all(sql2, [], (err, data) => {
            if (err) {
                throw err;
            }
            console.log(data);

            res.render("reader/article", { publishData: data, comments: comments });
        });

    })
})

router.get('/publishDelete/:id', function (req, res) {
    var UserId = parseInt(req.params.id);
    var sql = `DELETE FROM publishedData WHERE BlogId=${UserId}`
    db.serialize(function () {
        db.all(sql, [], (err, data) => {
            if (err) throw err;
            res.redirect("../homepage");
        });
    })

})

router.post('/likes/:id', function (req, res) {
    var UserId = parseInt(req.params.id);
    var sql = `UPDATE publishedData SET Likes=Likes+1 WHERE BlogId=${UserId}`
    var likes;
    db.serialize(function () {
        db.all(sql, [likes], (err, data) => {
            if (err) throw err;
            res.redirect(`../../reader/share/${UserId}`);
        })
    })
})
router.post('/comments/:id', function (req, res) {
    var UserId = parseInt(req.params.id);
    var comment = req.body.commentInput;
    var sql = `INSERT INTO comments VALUES(${UserId},?)`
    db.run(sql, [comment], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
        res.redirect(`../../reader/share/${UserId}`);
    })

})
module.exports = router;