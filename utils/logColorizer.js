'use strict'

//https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
let Colorizer = {

	ok:(str,jump = false)=>{
		if(jump) console.log('');
		console.log("\x1b[32m%s\x1b[0m",str);
		if(jump) console.log('');
	},

	value: (str,val,jump = false)=>{
		if(jump) console.log('');
		console.log("\x1b[32m%s\x1b[0m",str + " -> ","\x1b[33m"+val+"\x1b[0m")
		if(jump) console.log('');
	},

	err: (str,jump = false)=>{
		if(jump) console.log('');
		console.log("\x1b[31m\x1b[47m%s\x1b[0m",str);
		if(jump) console.log('');
	}
}

module.exports = Colorizer;