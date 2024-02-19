const express = require('express');
const path = require('path');
require("dotenv").config();
const cors = require('cors');
var bodyParser = require('body-parser');
const auth = require("./middleware/auth");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  express.urlencoded(),
  cors({
    origin: `http://localhost:${process.env.PORT}`
  })
);
var cookieParser = require('cookie-parser')
const sessions = require('express-session');
app.use(cookieParser())
const userRoutes = require('./routes/user');
const authorRoutes = require('./routes/author');
const readerRoutes = require('./routes/reader');
const loginRoutes = require('./routes/login');
//set the app to use ejs for rendering
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//this adds all the userRoutes to the app under the path /user
app.use('/user', userRoutes);

//this adds all the authorRoutes to the app under the path /author
app.use('/author', auth, authorRoutes);

//this adds all the authorRoutes to the app under the path /author
app.use('/reader', readerRoutes);
app.use('/api', loginRoutes);
app.use(express.static(path.join(__dirname, 'css')))

app.get('/', (req, res) => {
  res.render("author/login");
});
app.get('/register', (req, res) => {
  res.render("author/register");
});
module.exports = app;
