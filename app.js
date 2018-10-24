'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let Config = require('./config/config');
let path = require('path');
let responseTime = require('response-time');

//Tipo de instancia
let instance = process.argv[2] || 'dev';

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


//Comrpobación de ip permitida
let allowedIps = process.env.ALLOWED_IP.split(',');
console.log(allowedIps)

app.use((req,res,next)=>{
  let ip = req.ip.split(':').slice(-1)[0];
  if (allowedIps.indexOf(ip) >= 0){
    next();
  }else{
    return res.status(301).send({message: 'Your IP is not allowed to use this API',ip: ip});  
  }
  
});

//router
app.use(Config.apiPath,require(Config.routerPath));

//Calculo del tiempo de procesado
app.use(function(req,res,next){
  req.msStartRequest = Date.now();
  next();
})

//PUG Configuration
app.set('views', './views')
app.set('view engine', 'pug')
app.disable('view cache');

//Carpeta estatica
app.use(express.static(__dirname + '/public'));


if(instance === 'dev'){
  app.use(function(req, res, next) {
    let loadTime = Date.now() - req.msStartRequest;
    let ip = req.ip.split(':').slice(-1)[0];
    let requestUrl = req.originalUrl;
    res.status(404).render('view', 
      {
        url: req.originalUrl,
        loadTime: loadTime,
        ip: ip,
        error: 404,
        requestUrl: requestUrl,
      }
    )
  });
}

module.exports = app;