"use strict";

const express = require('express');
// middleware init here:
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
//const session = require('express-session');
const logger = require("morgan");
const expressJWT = require('express-jwt');

// app modules:
const secret = require('./secrets');
const questionRoutes = require('./api/questions');
const userRoutes = require('./api/users');
const authRoutes = require('./auth');
const errorHandler = require("./errorHandler").handleError;
require("./database"); // need this line otherwise app won't know about the database module

const serverPort = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // man this line is important :)

// We use logger(morgan) to log requests in the console and body-parser to parse req.body
app.use(logger("dev"));

// function filterAuthorizeRoutes(req) {
// 	console.log(req.originalUrl, req.method);
// 	if(req.originalUrl == '/auth/login' || req.originalUrl == '/auth/register'){
// 		console.log('were in login/register');
// 		return true;
// 	} else if(req.originalUrl == '/api/questions'){
// 	if(req.method == 'GET' || req.method == 'OPTIONS' ){
// 			console.log('were in GET questions');
// 			return true;
// 		}
// 	}
// 	return false;
// }

//init token middleware => protecting all routes except following, if no token => Unauthorized
app.use(expressJWT({
	secret,
	getToken: function fromHeaderOrQuerystring (req) {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			return req.headers.authorization.split(' ')[1];
		} else if (req.query && req.query.token) {
			return req.query.token;
		}
		return null;
	}
}).unless(
	{ path: [
		'/auth/login',
		'/auth/register',
		{url: '/api/questions', methods: ['GET', 'OPTIONS']}
		]
	}
));


app.use(function (req,res,next) {
	res.header('Access-Control-Allow-Origin', "http://localhost:3001"); // can't use * with credentials
	res.header('Access-Control-Allow-Credentials', true); //need for setting cookies with express
	res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Accept, Content-Type, Cookie, Authorization");
	if (req.method === "OPTIONS") {
		res.header({
			"Access-Control-Allow-Methods": "PUT, POST,DELETE"
		});
		return res.status(200).json({});
	 }
	next();
});

app.use(function(req,res,next){
	// here i can see the req payload with every request (example of most basic middleware)
	// and check session and cookies are being sent by the browser
	// console.log('REQ.USER',req.user); // this holds the token info for the protected routes only
	next();
});

app.use('/api', questionRoutes);
//[questionRoutes, userRoutes]
app.use('/auth', authRoutes);
// NOTHING served on '/' (root)

//catch 404 and forward to error handler (resource not found)
app.use(function(req,res,next){
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

// // but I use webpack dev server
// app.get('/*', (req,res) => {
// 	res.sendfile(path.join(__dirname, 'client/dist/index.html'))
// });

app.listen(serverPort,function(){
	console.log("Server running on port ", serverPort)
});