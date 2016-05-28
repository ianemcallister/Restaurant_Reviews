var express = require('express');

//define the express server
var app = express.createServer();

//define the routes
app.get('/api/get/:file', function(req, res) {
	console.log(req);
	res.send({'getTest':'good test'});
});

app.get('/api/set/:file', function(req, res) {
	console.log(req);
	res.send({'setTest':'good test'});
});

app.get('/api/newReview/:id', function(req, res) {
	console.log('sending a response');
	res.send({'newReview':'good test'});
	//res.sendfile();
});

app.get('/api/test', function(req, res) {
	console.log('sending a response');
	res.send({'testTest':'good test'});
	//res.sendfile();
});

//start listening
app.listen(5000);