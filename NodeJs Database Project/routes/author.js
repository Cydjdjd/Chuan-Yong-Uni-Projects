const express = require("express");
const router = express.Router();
const assert = require('assert');
const db = require("../config/database.js");
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(bodyParser.json());

router.get("/homepage/:UserId", (req, res) => {
    var titles;
    var blogsData;
    var UserId = parseInt(req.params.UserId);
    var tableTitles = ["BlogId", "Title", "SubTitle", "Created", "Last Modified", "Published", "Action","Likes"];
    var sql = `SELECT * FROM blogSettings WHERE UserId=${UserId}`;
    var sql2 = `SELECT * FROM blogData WHERE UserId=${UserId}`;
    var sql3 = `SELECT * FROM publishedData WHERE UserId=${UserId}`;
    db.serialize(function () {
        db.all(sql, [], (err, data) => {
            if (err) {
                throw err;
            }
            console.log(data);
            titles = data;
            console.log(titles);
        });
        db.all(sql2, [], (err, data) => {
            if (err) {
                throw err;
            }
            blogsData = data
        });
        db.all(sql3, [], (err, data) => {
            if (err) {
                throw err;
            }
            console.log(data);
            res.render("author/homepage", { titles: titles, tableTitles: tableTitles, blogsData: blogsData, publishData: data, UserId: UserId });
        });
    })

})

router.get('/edit/:id/:UserId', function (req, res) {
    console.log(req.body);
    var BlogId = parseInt(req.params.id);
    var UserId = parseInt(req.params.UserId);
    var sql = `SELECT * FROM blogData WHERE BlogId=${BlogId}`;
    console.log(sql);
    db.serialize(function () {
        db.all(sql, [], (err, data) => {
            if (err) throw err;
            console.log(data);
            res.render(`author/create-user-record`, { editData: data, UserId: UserId });
        });
    })
})
router.post('/edit/:UserId', function (req, res) {
    var UserId = parseInt(req.params.UserId);
    var title = req.body.title;
    var subtitle = req.body.subtitle;
    var articleText = req.body.articleText;
    var date_time = new Date();
    // get current date
    // adjust 0 before single digit date
    var date = ("0" + date_time.getDate()).slice(-2);
    // get current month
    var month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    // get current year
    var year = date_time.getFullYear();
    // get current hours
    var hours = date_time.getHours();
    // get current minutes
    var minutes = date_time.getMinutes();
    // get current seconds
    var seconds = date_time.getSeconds();
    if (hours < 10) {
        hours = "0" + hours
    }
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    var lastModified = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    console.log(lastModified)
    var BlogId = req.body.blogId;
    var sql = `UPDATE blogData SET Title=?,Subtitle=?,ArticleText=?,lastModified=?,UserId=? WHERE BlogId=?`;

    db.run(sql, [title, subtitle, articleText, lastModified, UserId, BlogId], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
    })
    res.redirect(`../homepage/${UserId}`);
});
router.get('/delete/:id/:UserId', function (req, res) {
    var UserId = parseInt(req.params.UserId);
    var BlogId = parseInt(req.params.id);
    var sql = `DELETE FROM blogData WHERE BlogId=${BlogId}`
    db.serialize(function () {
        db.all(sql, [], (err, data) => {
            if (err) throw err;
            res.redirect(`../../homepage/${UserId}`);
        });
    })

})

router.post('/settingsSubmit/:UserId', function (req, res) {
    var UserId = parseInt(req.params.UserId);
    var blogTitle = req.body.blogTitle;
    var subtitle = req.body.subtitle;
    var authorName = req.body.authorName;
    var sql = `INSERT INTO blogSettings VALUES(?,?,?,?)`;

    db.run(sql, [blogTitle, subtitle, authorName, UserId], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
    })
    res.redirect(`../homepage/${UserId}`);
});

router.get("/settings/:UserId", (req, res) => {
    var UserId = parseInt(req.params.UserId);
    var sql = `SELECT * FROM blogSettings WHERE UserId=${UserId}`;

    db.serialize(function () {
        db.all(sql, [], (err, data) => {
            if (err) {
                throw err;
            }
            console.log(data);
            res.render("author/settings", { editData: data, UserId: UserId });
        });
    })

})
router.post('/publish/:id/:UserId', function (req, res) {
    var UserId = parseInt(req.params.UserId);
    var BlogId = parseInt(req.params.id);
    var sql = `INSERT INTO publishedData(BlogId,Title,SubTitle,ArticleText,Created,lastModified,UserId) 
               SELECT BlogId,Title,Subtitle,ArticleText,Created,lastModified,UserId FROM blogData 
               WHERE BlogId=${BlogId}`;
    db.serialize(function () {
        db.all(sql, [], (err, data) => {
            if (err) throw err;

        });


        var sql2 = `DELETE FROM blogData WHERE BlogId=${BlogId}`
        db.all(sql2, [], (err, data) => {
            if (err) throw err;
            res.redirect(`../../homepage/${UserId}`);
        });

    })
})


router.get('/publishDelete/:id/:UserId', function (req, res) {
    var UserId = parseInt(req.params.UserId);
    var BlogId = parseInt(req.params.id);
    var sql = `DELETE FROM publishedData WHERE BlogId=${BlogId}`
    db.serialize(function () {
        db.all(sql, [], (err, data) => {
            if (err) throw err;
            res.redirect(`../../homepage/${UserId}`);
        });
    })

})
router.get('/logout', function (req, res) {
    res.status(200).clearCookie('x-access-token', {
        path: '/'
    });
    res.redirect('/');
});
module.exports = router;