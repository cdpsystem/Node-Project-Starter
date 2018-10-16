'use strict'

let mongoose = require('mongoose');
let app = require('./app');
let Config = require('./config/config');
let Colorizer = require('./utils/logColorizer');
let Clear = require('clear');

Clear();
Colorizer.fwcdWd();

if(Config.mongoDB == ''){
	Colorizer.err("Error: Specify a database in config/config.js is needed to continue",true);
	return false;
}


Colorizer.ok("Connecting with " + Config.mongoIP + ":" + Config.mongoPort + "/" + Config.mongoDB ,true);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://' + Config.mongoIP +  ':' + Config.mongoPort + '/' + Config.mongoDB,{useNewUrlParser: true } )
.then( ()=>{
	//Conexion realizada correctamente	

	Colorizer.ok("Connected with " + Config.mongoDB.toUpperCase() +" database in",true)
	Colorizer.value("Mongo ip",Config.mongoIP);
	Colorizer.value("Mongo Port",Config.mongoPort);
	app.listen(Config.serverPort,()=>{
		Colorizer.ok("Node server listening in",true);
		Config.apiPath != '' ? 
			Colorizer.value("Server ip",Config.serverIP + Config.apiPath + '/' ) : 
			Colorizer.value("Server ip",Config.serverIP);
		Colorizer.value("Server port",Config.serverPort);

		Colorizer.ok("Server waiting for requests")
	});
})
.catch(err => {
	//Error no se ha podido conectar a la base de datos
	Colorizer.err("Error. Can't connect to the mongo database. Is it Mongod running?",true);
	Colorizer.err(err);
}); 