'use strict'
let Config = {

	//Server Ip, not change, not supported yet
	serverIP : 'http://localhost/',
	//Node Port
	serverPort : 3700,

	//Router file
	routerPath: './routes/router',

	//Prefix for api, can be empty
	apiPath : 'test',

	//Ip of mongo database
	mongoIP : 'localhost',

	//Port of mongo database
	mongoPort : 27017,

	//Mongo database
	mongoDB : '',
	//Mongo Username
	mongoUser: '',
	//MongoPass
	mongoPass: ''
};
module.exports = Config;