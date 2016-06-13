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
	_loadJSONFile:_loadJSONFile,
	_writeAFile: _writeAFile,
	_saveIndividualReview:_saveIndividualReview,
	_addReviewToAllReviews:_addReviewToAllReviews,
	_addReviewToRestaurant:_addReviewToRestaurant,
	returnList:returnList,
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

function _loadJSONFile(directory, name) {
	var thisPath = path.join(__dirname, directory, name);
	var returnObject = fs.readFileSync(thisPath);
	return JSON.parse(returnObject);
}

function _writeAFile(directory, fileName, data) {
	//var dataManagment = this;
	console.log('writing the file');
	//will save to this location
	var thisPath = path.join(__dirname, directory, fileName);

	//create a seperate file
	var writable = fs.createWriteStream(thisPath);
	
	if(writable.write(JSON.stringify(data, null, '\t'))) return true;
	else return false;
}

function _saveIndividualReview(recordId, data) {
	var dataManagment = this;

	//create a seperate file
	if(dataManagment._writeAFile('./json/reviews/',(recordId + '.json'), data))
		return true;
	else return false;
}

function _addReviewToAllReviews(recordId, data) {
	var dataManagment = this;
	console.log('getting the reviews file');

	var allReviewsObject = dataManagment._loadJSONFile('./json/', 'allReviews.json');

	//add the record to the file
	allReviewsObject[recordId] = data;

	//write the file out
	if(dataManagment._writeAFile('./json/','allReviews.json', allReviewsObject))
		return true;
	else return false;	
}

function _addReviewToRestaurant(restaurantId, recordId) {
	var dataManagment = this;

	console.log('getting the restaurant file');

	var allRestaurantsObject = dataManagment._loadJSONFile('./json/', 'allRestaurants.json');
	
	//add the the recordId to the appropriate restaurant
	allRestaurantsObject[restaurantId].reviews.push(recordId);

	console.log('with added', allRestaurantsObject[restaurantId].reviews);

	//resave the file
	if(dataManagment._writeAFile('./json/','allRestaurants.json', allRestaurantsObject))
		return true;
	else return false;
}

function returnList(listParams) {
	var returnObject = {};

	//load all restaurants
	var allRestaurants = this._loadJSONFile('./json/', 'allRestaurants.json');

	//check for params
	if(typeof listParams.city !== 'undefined') {

		//load the hash
		var byCity = this._loadJSONFile('./json/hashes', 'byCityName.json');

		//get records in this city	
		var inThisCity = byCity[listParams.city];

		if(typeof inThisCity !== 'undefined') {
			//add all cities in this list to the array	
			inThisCity.forEach(function(id) {
				returnObject[id] = allRestaurants[id];
			});
		} else {
			returnObject = allRestaurants;
			returnObject['error'] = 'No restaurants were found in ' + listParams.city + ". Giving you all restaurants instead.";
		}
		

	} else {
		//if no params were present, return all the restaurants
		returnObject = allRestaurants;
	}

	//load hashe
	//var byZip = this._loadFile('./json/hashes', 'byZip.json');


	//return the object
	return returnObject;
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

				console.log(recordId);

				//make sure a new individual file was created
				if(dataManagment._saveIndividualReview(recordId, data)) {

					//add this review to the all reviews list
					dataManagment._addReviewToAllReviews(recordId, data);

					console.log('writing to the all restaurants list');
					//add this review to the specific restaurant it's for
					if(dataManagment._addReviewToRestaurant(data.restaurant, recordId)) 
						resolve({success: true, recordId: recordId});
					else 
						reject({success:false});
					//resolve({success: true, recordId: recordId});
				} else {
					reject({success:false});
				}

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