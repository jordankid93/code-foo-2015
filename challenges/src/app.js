/// <reference path="../../typings/node/node.d.ts"/>

var path = require('path');
var jade = require('jade');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');

var router = require("./router.js");

var server;
var port = process.env.PORT || process.env.NODE_PORT || 3000;

var app = express();
app.use(compression());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.resolve(__dirname + '/../public')));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

router.setupRoutes(app);

var server = app.listen(port, function(err){
	if (err) throw err;
	console.log("Listening on port " + port);
});