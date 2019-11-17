const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');

app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


console.log('App running');

app.use('/admin', authRoute);
app.use('/home', homeRoute);

//DEFAULT ROUTE
app.use('/*', (req, res, next) => {
    res.redirect('/home')
});


module.exports = app;