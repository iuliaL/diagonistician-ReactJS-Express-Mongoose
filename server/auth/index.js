"use strict";

const express = require("express");
const router = express.Router();
const User = require('./../models/UserModel');
const secret = require('../secrets');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.set('debug', true);


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
				res.status(201).json({message: 'Registered successfully'})
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
				user =  user.publicFormat(); // delete the __v
				delete user.password;
				const token = jwt.sign(
					user, //payload
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
	// no db interaction, no session, no nothing
	res.status(200).json({ message: 'Logged out'});
});

// GET user details
router.get('/user-details', function (req, res, next) {
	if(req.user && req.user){
		User.findOne({_id: req.user._id})
			.then((user)=>{
				console.log('user details', user);
				user = user.publicFormat();
				res.json(user)})
			.catch((err)=> next(err))
	}else {
		const err = new Error('Couldn\'t retrieve user id from token');
		return next(err)
	}
});

module.exports = router;