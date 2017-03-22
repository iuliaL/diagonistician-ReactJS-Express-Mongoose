'use strict';

const mongoose = require("mongoose");
const bcrypt =  require('bcrypt');

const userSchema = mongoose.Schema({
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			min: [5, 'Answer must be at least 10 characters long']
		},
		password: {
			type: String,
			required: true
		}
	},
	{ timestamps: {
		createdAt	: "createdAt",
		updatedAt	: "updatedAt"
		}
	}
);

// hash and salt password
userSchema.pre("save", function(next) { // !!! this and arrow function
	bcrypt.hash(this.password, 10)
		.then((hash) => {
			this.password = hash;
			next();
		}).catch( err => next(err));
});

module.exports = mongoose.model('user', userSchema );