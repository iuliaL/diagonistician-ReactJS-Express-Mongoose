"use strict";

var express = require('express');
var app = express();
//middleware here:
var jsonParser = require('body-parser').json;
var logger = require("morgan");

//other modules:
var routes = require('./routes'); //  or ./routes.js
var errorHandler = require("./errorHandler").handleError;
var database = require("./database");

var serverPort = process.env.PORT || 3000;

// app.use is handling Middleware in express
// We use logger(morgan) to log requests in the console and body-parser to parse req.body
app.use(jsonParser());
app.use(logger("dev"));

//app.use(function(req,res,next){
//	// here i can see the req payload with every request (example of most basic middleware)
//	console.log('req.body is ',req.body);
//	next();
//});

app.use('/questions',routes);

//catch 404 and forward to error handler (resource not found)
app.use(function(req,res,next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(serverPort,function(){
	console.log("Server running on port ", serverPort)
});