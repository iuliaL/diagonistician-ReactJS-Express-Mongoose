"use strict";

const express = require("express");
const router = express.Router();

// GET /register
router.get('/register', function(req, res, next) {
	return res.send('GET Register route');
});

// GET /register
router.post('/register', function(req, res, next) {
	return res.send('POST Register route');
});

// GET /login
router.get('/login', function(req, res, next) {
	return res.send('Login route set');
});

module.exports = router;