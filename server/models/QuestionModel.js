"use strict";

var mongoose = require("mongoose");

// here a 'pure' sorting function
var sortAnswersDesc = function(answer1, answer2){
	// should return negative if answer1 has less votes than answer 2
	// should return 0 if the votes count is equal for both answers
	// should return positive if answer1 has more votes than answer 2

	if(answer1.votes === answer2.votes){
		return answer2.updatedAt - answer1.updatedAt; // this is sorting by updated at DESC
	}
	return answer2.votes - answer1.votes; // this is sorting by vote count desc
};


var answerSchema = mongoose.Schema({
	text: {
		type: String,
		required: true,
		min: [10, 'Answer must be at least 10 characters long']
	},
	votes: { type: Number, default: 0 },
	owner: {
		_id : String, // user id
		username : String
	},
	votedBy: [ String ]
	},
	{ timestamps: {
		createdAt	: "createdAt",
		updatedAt	: "updatedAt"
		}
	}
);

answerSchema.methods.update = function(updates){
	Object.assign(this, updates, { updatedAt: new Date() });
	return this.parent().save(); // don't forget to save() the parent
};

answerSchema.methods.vote = function(vote, voter){
	vote == "up" ? this.votes += 1 : this.votes -= 1;
	this.votedBy.push(voter); // add voter to votedBy array
	return this.parent().save(); // don't forget to save() the parent
};

var questionSchema = mongoose.Schema({
	text: {
		type: String,
		required: true,
		min: 10
	},
	answers	: [ answerSchema ],
	owner: {
		_id : String, // user id
		username : String
	},
},
	{ timestamps: {
		createdAt	: "createdAt"
		}
	}
);

questionSchema.methods.publicFormat = function() {
	var result = this.toJSON();
	// this is to get rid of the question __v (used internally by mongoose) when sending the data to the client
	delete(result.__v);
	return result
};

questionSchema.pre("save", function(next){
	if (this.answers){
		this.answers.sort(sortAnswersDesc);
	}
	next();
});

module.exports = mongoose.model('question', questionSchema );