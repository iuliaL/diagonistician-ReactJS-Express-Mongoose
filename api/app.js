"use strict";

const express = require('express');
const app = express();
// middleware here:
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require("morgan");

// app modules:
const questionRoutes = require('./routes');
const authRoutes = require('./auth');
const errorHandler = require("./errorHandler").handleError;
require("./database"); // need this line otherwise app won't know about the database module

const serverPort = process.env.PORT || 8080;

// app.use is handling Middleware in express
// We use logger(morgan) to log requests in the console and body-parser to parse req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // man this line is important :)
app.use(logger("dev"));

// app.use(function(req,res,next){
// 	// here i can see the req payload with every request (example of most basic middleware)
// 	console.log('req.body is ',req.body);
// 	next();
// });
app.use(session({
	secret: 'my secret level of security',
	resave: true,
	saveUninitialized: false
}));

app.use(function (req,res,next) {
	res.header('Access-Control-Allow-Origin', "*"); // req accepted from any domain
	res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Accept, Content-Type");
	if (req.method === "OPTIONS") {
		res.header({
			"Access-Control-Allow-Methods": "PUT,POST,DELETE"
		});
		return res.status(200).json({});
	 }
	next();
});

app.use('/questions', questionRoutes);
app.use('/auth', authRoutes);
// NOTHING served on '/' (root)

//catch 404 and forward to error handler (resource not found)
app.use(function(req,res,next){
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(serverPort,function(){
	console.log("Server running on port ", serverPort)
});