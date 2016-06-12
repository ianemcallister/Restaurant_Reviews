var express = require('express');
var bodyParser = require('body-parser');
var dataManager = require('./dataManagement.js');
var path = require('path');
	
//var test = path.join(__dirname, 'something', 'something else');

//console.log(test);

//define the express server
var app = express.createServer();

//define our body parsers
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//define the routes
app.get('/api/get/:file', function(req, res) {
	
	//define the local variables
	var dir = './json/';
	var fileName = req.params.file;
	
	//return the requested file
	res.sendfile(fileName, {root: path.join(__dirname, dir)});

});

app.get('/api/set/:file', function(req, res) {
	console.log(req.params.file, 'sent over');

	//when we 
	res.send({'setTest':'good test'});
});

app.post('/api/getList', function(req, res) {
	var listParams = req.body;

	console.log('got these params', listParams);

	var returnObject = dataManager.returnList(listParams);
	
	res.send(returnObject);

	//res.sendfile(fileName, {root: path.join(__dirname, dir)});
});

app.post('/api/newReview', function(req, res) {
	var reviewData = req.body;
	
	//if a new review comes in, save it
	dataManager.createFile('review', reviewData).then(function(response) {

		res.send(response);
	});
	
});

app.get('/api/test', function(req, res) {
	console.log('sending a response');
	res.send({'testTest':'good test'});
	//res.sendfile();
});

//start listening
app.listen(5000);