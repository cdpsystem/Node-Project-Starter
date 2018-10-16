'use strict'

let mongoose = require('mongoose');
let app = require('./app');
let Config = require('./config/config');


if(Config.mongoDB == ''){
	console.log('');
	console.log("\x1b[31m\x1b[47m%s\x1b[0m","Error: Specify a database in config/config.js is needed to continue");
	console.log('');
	return false;
}

console.log('');
console.log(new Date(),"Connecting with " + Config.mongoIP + ":" + Config.mongoPort + "/" + Config.mongoDB );
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://' + Config.mongoIP +  ':' + Config.mongoPort + '/' + Config.mongoDB,{useNewUrlParser: true } )
.then( ()=>{
	//Conexion realizada correctamente	
	console.log('')	;
	console.log("\x1b[\x1b[32mConnected with \x1b[33m" + Config.mongoDB + ' \x1b[32mdatabase in port \x1b[33m' + Config.mongoPort);

	app.listen(Config.serverPort,()=>{
		console.log("\x1b[32mNode Server up in -> \x1b[33mlocalhost:"+Config.serverPort);
		console.log('\x1b[0m');
		});
	})
	.catch(err => {
		//Error no se ha podido conectar a la base de datos
		console.log(err);
	}); 