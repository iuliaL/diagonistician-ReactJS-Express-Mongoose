"use strict";

const express = require("express");
const router = express.Router();
const User = require('./models/UserModel');

// POST /register
router.post('/register', function(req, res, next) {
	const {username, password, confirmPassword} = req.body;
	if(username && password && confirmPassword){
		console.log(password ==  confirmPassword);
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

// GET /login
router.get('/login', function(req, res, next) {
	return res.send('Login route set');
});

module.exports = router;