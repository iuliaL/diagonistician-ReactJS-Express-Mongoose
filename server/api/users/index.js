'use strict';

const express = require("express");
const router = express.Router();
const User = require('../../models/UserModel');

const baseUrl = '/users';

// GET user id (UNUSED)
router.get(`${baseUrl}/:id`, function (req, res, next) {
	User.findById(req.params.id)
		.exec()
		.then((user)=>{console.log('user details', user)})
		.catch((err)=> next(err))
});