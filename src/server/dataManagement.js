'use strict'

//declare dependencies
var fs = require('fs');
var readline = require('readline');

//define the object
var DataManagement = {
	getServerFile: getServerFile
}



function getServerFile(fileName) {
	var dm = this;

	var returnObject = {};

	//define the readstream
	var rl = readline.createInterface({
		input: fs.createReadStream('./json/' + fileName)
	});

	//read the data
	rl.on('line', function(line) {

	});
}	

module.exports = DataManagement;