"use strict";

var mongoose = require("mongoose");
var moment = require('moment'); // this is not needed,just wanted to see how answers are sorted with a formatted date/time


// here a 'pure' sorting function
var sortAnswersDesc = function(answer1, answer2){
	// should return negative if answer1 has less votes than answer 2
	// should return 0 if the votes count is equal for both answers
	// should return positive if answer1 has more votes than answer 2
	console.log("posted: ",moment(answer1.updatedAt).format("YYYY-MM-DD HH:mm"));

	if(answer1.votes === answer2.votes){
		return answer2.votes - answer1.votes; // this is sorting by updated at DESC
	}
	return answer2.votes - answer1.votes; // this is sorting by vote count desc
};


var answerSchema = mongoose.Schema({
	text: String,
	createdAt	: { type: Date, default: Date.now()},
	updatedAt	: { type: Date, default: Date.now()},
	votes	 	: { type: Number, default: 0 }
});

answerSchema.methods.update = function(updates){
	Object.assign(this, updates, { updatedAt: new Date() });
	return this.parent().save(); // don't forget to save() the parent
};

answerSchema.methods.vote = function(vote){
	if(vote === "down"){
		this.votes -= 1;
	} else {
		this.votes += 1;
	}
	return this.parent().save(); // don't forget to save() the parent
};

var questionSchema = mongoose.Schema({
	text		: String,
	createdAt	: { type: Date, default: Date.now()},
	answers		: [ answerSchema ]
});

questionSchema.methods.publicFormat = function() {
	var result = this.toJSON();
	delete(result._id); // this is to get rid of the _id and __v when sending to the client
	delete(result.__v);
	return result
};

questionSchema.pre("save", function(next){
	this.answers.sort(sortAnswersDesc);
	next();
});

module.exports = mongoose.model('question', questionSchema );