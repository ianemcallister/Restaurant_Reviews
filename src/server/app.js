var express = require('express');

var app = express.createServer();
//var router = express.router();
//var hbs = require('hbs');

//app.set('view engine', 'html');
//app.engine('html', hbs.__express);

//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.static('public'));

app.get('/api/test', function(req, res) {
	console.log('sending a response');
	res.send({'apiTEst':'good test'});
	//res.sendfile();
});

app.listen(5000);