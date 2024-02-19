const express = require("express");
const router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var db = require("../config/database.js");
router.post("/login", async (req, res) => {

    try {
        let user = [];
        var Email = req.body.Email;
        var Password = req.body.Password;
        var sql = "SELECT * FROM Users WHERE Email = ?";
        db.all(sql, Email, function (err, rows) {

            rows.forEach(function (row) {
                user.push(row);
            })

            var PHash = bcrypt.hashSync(Password, user[0].Salt);
            console.log(PHash);
            console.log(user[1]);
            if (PHash === user[0].Password) {
                // * CREATE JWT TOKEN
                const token = jwt.sign(
                    { user_id: user[0].Id, username: user[0].Username, Email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "1h", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
                    }
                );

                user[0].Token = token;
                let options = {
                    path: "/",
                    sameSite: true,
                    maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
                    httpOnly: true, // The cookie only accessible by the web server
                }
                res.cookie('x-access-token', token, options)
                res.redirect(`/author/homepage/${user[0].Id}`)
                res.end()
            } else {
                res.clearCookie('x-access-token');
                res.status(400).send("Invalid Credentials");
                res.end()
            }


        });

    } catch (err) {
        console.log(err);
    }

});


router.post("/register", async (req, res) => {
    var errors = []
    try {
        const { Username, Email, Password } = req.body;

        if (!Username) {
            errors.push("Username is missing");
        }
        if (!Email) {
            errors.push("Email is missing");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        let userExists = false;


        var sql = "SELECT * FROM Users WHERE Email = ?"
        await db.all(sql, Email, (err, result) => {
            if (err) {
                res.status(402).json({ "error": err.message });
                return;
            }

            if (result.length === 0) {

                var salt = bcrypt.genSaltSync(10);

                var data = {
                    Username: Username,
                    Email: Email,
                    Password: bcrypt.hashSync(Password, salt),
                    Salt: salt,
                    DateCreated: Date('now')
                }

                var sql = 'INSERT INTO Users (Username, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?)'
                var params = [data.Username, data.Email, data.Password, data.Salt, Date('now')]
                var user = db.run(sql, params, function (err, innerResult) {
                    if (err) {
                        res.status(400).json({ "error": err.message })
                        return;
                    }
                })

            }
            else {
                userExists = true;
                // res.status(404).send("User Already Exist. Please Login");  
            }
        });

        setTimeout(() => {
            if (!userExists) {
                res.clearCookie('x-access-token');
                res.redirect("/");
            } else {
                res.clearCookie('x-access-token');
                res.redirect("/");
            }
        }, 500);


    } catch (err) {
        console.log(err);
    }

})

module.exports = router;
