'use strict'

let test = {
	home: (req,res)=>{
		return res.status(200).send({message: 'Hello World'});
	}
}

module.exports = test;