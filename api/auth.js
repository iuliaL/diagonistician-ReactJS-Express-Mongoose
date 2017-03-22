"use strict";

const express = require("express");
const router = express.Router();
const User = require('./models/UserModel');


// GET /register
// router.get('/register', function(req, res, next) {
// 	return res.send('GET Register route');
// });

// POST /register
router.post('/register', function(req, res, next) {
	console.log('new user',req.body);
	if(req.body.username && req.body.password){
		const {username, password} = new User(req.body);
		const newUser = {username, password};
		User.create(newUser)
			.then(()=>res.status(201).json({message: 'OK. New user created'}))
			.catch((err)=> {
				if (err.code === 11000) {
					const err = new Error('This user exists already');
					err.status = 409;
					next(err);
				}
				next(err); // for other err status codes
			});
	}

});

// GET /login
router.get('/login', function(req, res, next) {
	return res.send('Login route set');
});

module.exports = router;