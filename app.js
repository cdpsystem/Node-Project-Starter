'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let Config = require('./config/config');
let path = require('path');
let responseTime = require('response-time');
let Colorizer = require('./utils/logColorizer');
let fs = require('fs');

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
Colorizer.ok("CORS applied");

//Comprobación de ip permitida
let allowedIps = process.env.ALLOWED_IP.split(',');
Colorizer.ok('Loaded Allowed Ip\'s');

if(allowedIps[0] !== '0.0.0.0'){
  app.use((req,res,next)=>{
    let ip = req.ip.split(':').slice(-1)[0];
    if (allowedIps.indexOf(ip) >= 0){
      next();
    }else{
      if(process.env.LOGIPBLOCK){
        fs.exists(__dirname+'/logs/ipblocked.log',(exists)=>{
          if(!exists) fs.writeFileSync(__dirname+'/logs/ipblocked.log','# Structure:\n# ip\n\n',null);
          fs.readFile(__dirname+'/logs/ipblocked.log', function (err, data) {
            if (err) console.log(err);
            if(data.indexOf(ip) == -1){      
              fs.appendFile(__dirname+'/logs/ipblocked.log',ip + '\n',(err)=>{if(err)console.log(err)})
            }
          });
        })                
      }
      return res.status(301).send({message: 'Your IP is not allowed to use this API',ip: ip});  
    }
  });
  Colorizer.ok('Loaded IP Block Middleware')  
}else{
  Colorizer.warn('No IP filtering active. Can be a security risk');  
}


//router
app.use(Config.apiPath,require(Config.routerPath));
Colorizer.ok('Loaded Router Middleware')

//Calculo del tiempo de procesado
app.use(function(req,res,next){
  req.msStartRequest = Date.now();
  next();
})
Colorizer.ok('Loaded TimeResponse Calculator Middleware')

//PUG Configuration
app.set('views', './views')
app.set('view engine', 'pug')
app.disable('view cache');
Colorizer.ok('Loaded PUG options')

//Block normal favicon
app.get('/favicon.ico', (req, res) => res.status(204));

//Carpeta estatica
app.use(express.static(__dirname + '/public'));
Colorizer.ok('Loaded static folder for PUG files')


if(instance === 'dev'){
  app.use(function(req, res, next) {
    let loadTime = Date.now() - req.msStartRequest;
    let ip = req.ip.split(':').slice(-1)[0];
    let requestUrl = req.originalUrl;

    if(process.env.LOG404){
      fs.exists(__dirname+'/logs/404.log',(exists)=>{
        if(!exists) fs.writeFileSync(__dirname+'/logs/404.log','# Structure\n# ip,path\n\n',null);
        fs.readFile(__dirname+'/logs/404.log', function (err, data) {
          if (err) console.log(err);    
          fs.appendFile(__dirname+'/logs/404.log',ip +','+requestUrl+ '\n',(err)=>{if(err)console.log(err)})          
        });
      })                
    }


    return res.status(404).render('404', 
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
Colorizer.ok('Loaded 404 PUG Middleware');

module.exports = app;