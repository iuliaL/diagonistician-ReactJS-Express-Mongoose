"use strict";

const express = require("express");
const router = express.Router();
const Question = require('./../../models/QuestionModel');
const User = require('../../models/UserModel');


const baseUrl = '/questions';

//GET /questions
router.get(baseUrl, function(req,res,next){
	const query = Question.find({}, null); // null is for projection
	query.sort({ createdAt: - 1});
	query.exec()
		.then(function(questions){
			questions = questions.map(function(q){
				return q.publicFormat();
			});
			res.status(200).json(questions);
		})
		.catch(function(err){
			return next(err);
		});
});

//GET by id /questions/:qId

// these router.param methods check if some param is in the route requested and does something
router.param('qId', function(req,res,next){
	Question.findOne({_id: req.params.qId})// or use findById(req.params.qId)
	.exec()
	.then(function(question){
		// handle the id Not Found possibility
		if (!question){
			const err = new Error("Question not found.");
			err.status = 404;
			next(err); // this error will be caught by the errorHandler
		} else {
			req.questionFound = question;
			next(); //will pass req.questionFound to the req obj
		}
	})
	.catch(function(err){
		next(err);
	})
});

router.param('aId', function(req,res,next){
	req.answer = req.questionFound.answers.id(req.params.aId);//this id() retrieves the sub document with the respective id
	if (!req.answer){
		const err = new Error("Answer not found.");
		err.status = 404;
		next(err); // this error will be caught by the errorHandler
	} else { next(); } //will pass req.answer to the route
});

router.get(`${baseUrl}/:qId`,function(req,res, next){
	res.status(200).json(req.questionFound.publicFormat());
});

//POST /questions
router.post(`${baseUrl}`, function(req,res,next){
	const newQuestion = new Question(req.body);
	console.log('user?', req.user);
	if(req.user){
		const { _id, username } = req.user;
		newQuestion.owner = { _id, username};
	} else {
		const error =  new Error('Couldn\'t parse token');
		error.status = 500;
		return next(error);
	}
	newQuestion.save()
	.then(function(reply){ //the reply is the actual question created
		res.status(201).json(reply.id)
	})
	.catch(function(err){
		next(err);
	});
});

//DELETE /questions/:qId
router.delete(`${baseUrl}/:qId`, function (req,res,next) {
	req.questionFound.remove().then(function () {
		res.status(200).send("Question deleted successfully.")
	}).catch(function(err){
		next(err);
	})
});

//POST /questions/:qId/answers
router.post(`${baseUrl}/:qId/answers`,function(req, res, next){
	const questionFound = req.questionFound;
	const newAnswer = req.body;
	if(req.user){
		const { _id, username } = req.user;
		newAnswer.owner = { _id, username};
	} else {
		const error =  new Error('No logged in user found');
		error.status = 500;
		return next(error);
	}
	questionFound.answers.push(newAnswer);
	questionFound.save() // save the parent question
	.then(function(reply){
		res.status(201).json(reply.id);
	}).catch(function(err){
		next(err);
	})
});

//PUT /questions/:qId/answers/:aId
router.put(`${baseUrl}/:qId/answers/:aId`, function(req,res){
	req.answer.update(req.body)
	.then(function(reply){
		res.status(200).json(reply.id);
	})
	.catch(function(err){
		next(err);
	});
});

//DELETE /questions/:qId/answers/:aId
router.delete(`${baseUrl}/:qId/answers/:aId`,function(req,res){
	req.answer.remove()
	.then(function(){
		req.answer.parent().save()
		.then(function(){
			res.status(200).send('Resource deleted.');
		}).catch(function(err){
			next(err);
		})
	}).catch(function(err){
		next(err);
	})
});

//POST /questions/:qId/answers/:aId/vote-up
// &
//POST /questions/:qId/answers/:aId/vote-down
router.post(`${baseUrl}/:qId/answers/:aId/vote-:dir`, function(req,res,next){
	console.log('req user in vote', req.user, req.answer);
			if(req.params.dir.search(/^(up|down)$/) === -1){
				const err = new Error("Argument up/down not found");
				err.status = 404;
				next(err); //this next will call the Error handler with the err argument
			} else if(req.user && alreadyVoted(req.answer.votedBy, req.user._id)){
				const err = new Error('Answers can be voted only once');
				err.status = 400;
				return next(err)
			} else {
				next(); // this next will go forward to send the response
			}
		},function(req,res){
			// here get req.answer.owner and reward him
			const rewardOwner = (ownerId) =>
				User.findById(ownerId)
					.exec()
					.then((userFound)=> {
						const points = userFound.points + (req.params.dir == 'up' ? 1 : -1);
						User.update({_id: userFound._id},{ points, updatedAt: new Date()})
						// i use update instead of save() model method cause it bypasses the middleware, meaning the pre-save pass rehashing
							.then(() => console.log('user points updated'))
					}).catch((err)=>console.log('something went wrong with user point update',err));
			Promise.all([
				req.answer.vote(req.params.dir, req.user._id),
				rewardOwner(req.answer.owner._id)
			])
			.then(function(){
				res.json({
					voteDirection: req.params.dir,
					votedBy: req.answer.votedBy
				});
			})
			.catch(function(err){
				next(err);
			});
});

function alreadyVoted(votes, voter) {
	return votes.indexOf(voter) > -1
}

module.exports = router;