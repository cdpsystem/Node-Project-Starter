'use strict'
let Moment = require('moment');

//https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
let Colorizer = {

	green:(str)=>{
        return `\x1b[32m${str}\x1b[35m`;
	},

	ok:(str,jump = false)=>{
		let now = Moment().format('H:mm:ss');
		if(jump) console.log('');
		console.log('\x1b[37m[' +  now  + ']\x1b[35m [INFO]  ' + str + '\x1b[0m');

	},

	value: (str,val,jump = false)=>{
		let now = Moment().format('H:mm:ss');
		if(jump) console.log('');
		console.log("\x1b[37m[" +  now  + "]\x1b[35m [VALUE]%s\x1b[0m",' '+str + " -> ","\x1b[36m"+' '+val+"\x1b[0m")

	},

	err: (str,jump = false)=>{
		let now = Moment().format('H:mm:ss');
		if(jump) console.log('');
		// console.log("\x1b[31m\x1b[47m%s\x1b[0m",' '+str);
		console.log('\x1b[37m[' +  now  + ']\x1b[31m [ERROR] ' + str + '\x1b[0m')
		if(jump) console.log('');
	},

	warn:(str,jump = false)=>{
		let now = Moment().format('H:mm:ss');
		if(jump) console.log('');
		console.log('\x1b[37m[' +  now  + ']\x1b[33m [WARN]  ' + str + '\x1b[0m');

	},

	fwcdWd:()=>{
		console.log("\x1b[35m%s",'');
		console.log(" ____________________________________________________________________________________        ");
		console.log("\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/");
		console.log('');
		console.log('');
		console.log('   ________  ___    ____         __              _  ______  ___  ____                         ');
		console.log("  \/ ___\/ _ \\\/ _ \\  \/ __\/_ _____ \/ \/____ __ _    \/ |\/ \/ __ \\\/ _ \\\/ __\/                         ");
		console.log(" \/ \/__\/ \/\/ \/ ___\/ _\\ \\\/ \/\/ (_-<\/ __\/ -_)  \' \\  \/    \/ \/_\/ \/ \/\/ \/ _\/                           ");
		console.log(" \\___\/____\/_\/    \/___\/\\_, \/___\/\\__\/\\__\/_\/_\/_\/ \/_\/|_\/\\____\/____\/___\/                           ");
		console.log("                     \/___\/                                                                    ");
		console.log('');
		console.log('  Creado por Cristian Diaz Prado')
		console.log('  v: '+process.env.VERSION+' '+ process.env.VERSION_NAME)
		console.log(" ____________________________________________________________________________________        ");
		console.log("\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/___\/        ");
		console.log('');
		console.log("\x1b[0m");
	}
}

module.exports = Colorizer;