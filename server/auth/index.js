"use strict";

const express = require("express");
const router = express.Router();
const User = require('./../models/UserModel');
const secret = require('../secrets');
const jwt = require('jsonwebtoken');


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
			.then((user)=>{
				res.status(201).json({message: 'OK. New user created'})
			})
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
	const b64Encoded = req.header('Authorization').split('Basic ').pop();
	const credentials = new Buffer(b64Encoded, 'base64').toString().split(":");
	const [ username, password ] = credentials;
	if(username && password){
		User.authenticate(username,password)
			.then(user => {
				user = user.toObject();
				delete user.password;
				delete user.username;
				const token = jwt.sign(
					{ user }, //payload
					secret  // sign the token with my server-stored secret
				);
				res.status(200)
					.json({message: 'Authenticated', token: token});
			}).catch(err => next(err));
	} else {
		const err = new Error('Both username and password are mandatory!');
		err.status = 401; // Unauthorized
		return next(err);
	}
});

//GET /logout
router.get('/logout', function (req, res, next) {
	// if(req.session && req.session.userId){
	// 	req.session.destroy((err)=> {
	// 		if(err){
	// 			return next(err);
	// 		} else {
	// 			console.log('session destroyed, user logged out');
	// 			res.status(200).json({ message: 'session destroyed, user logged out'});
	// 		}
	// 	})
	// }
	res.status(200).json({ message: 'user logged out'});
});

module.exports = router;