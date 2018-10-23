'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let Config = require('./config/config');
let path = require('path');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use(function (req, res, next) {    
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//router
app.use(Config.apiPath,require(Config.routerPath));

app.use(express.static(__dirname + '/404'))

app.use(function(req, res, next) {
   	res.status(404).sendFile('404.html', {root: '404/'});
});

module.exports = app;