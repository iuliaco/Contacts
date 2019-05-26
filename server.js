var express = require('express');
var bodyParser= require("body-parser");
var router =require('./server/routes/routes.js');
const passport = require('passport');
const secureRoute = require('./server/routes/secure-routes');
var path = require('path');
var app = express();
const mongoose = require('mongoose');
var db= require("./models/connection.js");
require('./server/auth/auth.js');
app.use(passport.initialize());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

app.use('/client', express.static(path.join(__dirname, '/client')));
app.use('/', router);
app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/client' + '/index.html');
});

var port = 8000;
app.listen(port, function() {
 console.log('running at localhost: ' + port);
});


module.exports=app;

