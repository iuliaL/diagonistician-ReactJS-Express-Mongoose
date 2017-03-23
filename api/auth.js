"use strict";

const express = require("express");
const router = express.Router();
const User = require('./models/UserModel');

// POST /register
router.post('/register', function(req, res, next) {
	const {username, password, confirmPassword} = req.body;
	if(username && password && confirmPassword){
		if(password != confirmPassword){
			const err = new Error('Passwords didn\'t match');
			err.status = 400;
			return next(err);
		}
		const newUser = {username, password};
		User.create(newUser)
			.then(()=>res.status(201).json({message: 'OK. New user created'}))
			.catch((err)=> {
				if (err.code === 11000) {
					const err = new Error('This user exists already');
					err.status = 409; // Conflict
					return next(err);
				}
				next(err); // for other err status codes
			});
	} else {
		const err = new Error('All fields are required!');
		err.status = 400;
		return next(err);
	}
});

// POST /login
router.post('/login', function(req, res, next) {
	const {username, password} = req.body;
	if(username && password){
		User.authenticate(username,password)
			.then( response => {
				console.log('something from callback', response);
				res.status(200).json(response)})
			.catch(err => next(err));
	} else {
		const err = new Error('Both username and password are mandatory!');
		err.status = 401; // Unauthorized
		return next(err);
	}
});

module.exports = router;