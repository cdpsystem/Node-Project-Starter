'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let Config = require('./config/config');
let path = require('path');
let responseTime = require('response-time');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(responseTime());

//CORS
app.use(function (req, res, next) {    
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(function(req,res,next){
  req.msStartRequest = Date.now();
  next();
})

//router
app.use(Config.apiPath,require(Config.routerPath));


//PUG Configuration
app.set('views', './views')
app.set('view engine', 'pug')

app.disable('view cache');

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    let loadTime = Date.now() - req.msStartRequest;
   	res.status(404).render('view', 
   		{
   			url: req.originalUrl,
        loadTime: loadTime
   		}
   	)
});

module.exports = app;