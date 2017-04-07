'use strict';

const mongoose = require("mongoose");
const bcrypt =  require('bcrypt');

// Use native promises
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		password: {
			type: String,
			required: true
		},
		points: {
			type: Number,
			default: 0
		}
		
	},
	{ timestamps: {
		createdAt	: "createdAt",
		updatedAt	: "updatedAt"
		}
	}
);

// authenticate user login input against db document
userSchema.statics.authenticate = function (username, password) {
	return new Promise((resolve, reject) => {
		this.model('user').findOne({username})
			.exec()
			.then((user)=>{
				if(user){
					bcrypt.compare(password, user.password, function (err, match) {
						// password matches hashed password from db
						if(err) return reject(err);
						match ? resolve(user) : function(){
							const err = new Error('Invalid password');
							// although i wouldn't differentiate
							// username error from pass error for the sake of security
							err.status = 401;
							reject(err);
							}();
					});
				} else {
					const err = new Error('User not found');
					err.status = 401;
					reject(err);
				}
			})
			.catch((err)=> reject(err));
	})

};

// hash and salt password before saving to db
userSchema.pre("save", function(next) { // !!! this and arrow function
	bcrypt.hash(this.password, 10)
		.then((hash) => {
			console.log('new hash', hash);
			this.password = hash;
			next();
		}).catch( err => next(err));
});

userSchema.methods.publicFormat = function() {
	const result = this.toJSON();
	// this is to get rid of the  __v
	delete(result.__v);
	delete result.password;
	return result
};

const User = mongoose.model('user', userSchema );

module.exports = User;