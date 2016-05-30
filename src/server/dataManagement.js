'use strict'

//declare dependencies
var fs = require('fs');
//var readline = require('readline');
var path = require('path');
var fileTypes = {'review': 0, 'restaurant':1};

//define the object
var DataManagement = {
	_utf8_to_b64:_utf8_to_b64,
	_buildRecordId:_buildRecordId,
	createFile: createFile
}

function _utf8_to_b64(str) {
	var newString = new Buffer(str).toString('base64');
	return newString;
}

function _buildRecordId(type, data) {
	var dm = this;

	switch(fileTypes[type]) {
		case 0:
			//if this is a review
			var restaurantId = data.restaurant;
			var userName = data.name.first + data.name.last;
			var date = data.date;
			var returnRecord = dm._utf8_to_b64(restaurantId + date + userName);
			break;
		case 1:
			break;
		default:
			break;
	}

	return returnRecord;
}

function createFile(type, data) {
	var dataManagment = this;

	console.log(data);

	//async work, so return as a promise
	return new Promise(function(resolve, reject) {

		//create the proper file type
		switch(fileTypes[type]) {
			case 0:
				//create a new record id	
				var recordId = dataManagment._buildRecordId(type, data);

				//TODO: TAKE THIS OUT LATER
				console.log('new recordId:', recordId);

				//will save to this location
				var thisPath = path.join(__dirname, './json/reviews/', recordId + '.json');

				//create a seperate file
				var writable = fs.createWriteStream(thisPath);
				writable.write(JSON.stringify(data, null, '\t'));

				//TODO: TAKE THIS OUT LATER
				console.log('Sending this back', {success: true, recordId: recordId});

				//TODO: save to the allReviews Json also.
				resolve({success: true, recordId: recordId});

				break;
			case 1:
				break;
			default:
				reject({success:false});
				break;
		}

	});

}

module.exports = DataManagement;