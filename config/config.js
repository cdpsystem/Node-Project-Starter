'use strict'
let Config = {
	//Node Port
	serverPort : 3700,

	//Router file
	routerPath: './routes/router',

	//Prefix for api, can be empty
	apiPath : '',

	//Ip of mongo database
	mongoIP : 'localhost',

	//Port of mongo database
	mongoPort : 27017,

	//Mongo database
	mongoDB : '',
};
module.exports = Config;