'use strict'

//declare dependencies
var fs = require('fs');
var readline = require('readline');
var path = require('path');
var fileTypes = {'review': 0, 'restaurant':1};

//define the object
var DataManagement = {
	createFile: createFile
}

function createFile(type, record, data) {

	//async work, so return as a promise
	return new Promise(function(resolve, reject) {

		//create the proper file type
		switch(fileTypes[type]) {
			case 0:
				var thisPath = path.join(__dirname, './json/reviews/', record + '.json');
				
				//create a seperate file
				var writable = fs.createWriteStream(thisPath);
				writable.write(JSON.stringify(data, null, '\t'));

				//TODO: save to the allReviews Json also.
				resolve({success: true});

				break;
			case 1:
				break;
			default:
				resolve({success:false});
				break;
		}

	});

}

module.exports = DataManagement;