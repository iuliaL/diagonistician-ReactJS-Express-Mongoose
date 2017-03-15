"use strict";

const express = require("express");
const router = express.Router();

// GET /register
router.get('/register', function(req, res, next) {
	return res.send('Register route');
});

// GET /login
router.get('/login', function(req, res, next) {
	return res.send('Login route set');
});

module.exports = router;