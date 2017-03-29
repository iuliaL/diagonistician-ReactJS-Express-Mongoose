'use strict';

import * as ActionTypes from '../actiontypes/constants';
import QuestionApi from '../apirequests/questions'

function requestQuestions() {
	return {
		type: ActionTypes.FETCH_QUESTIONS_REQUEST
	}
}

function receiveQuestions(questions) {
	return {
		type: ActionTypes.FETCH_QUESTIONS_SUCCESS,
		questions
	}
}
function rejectQuestions(error) {
	return {
		type: ActionTypes.FETCH_QUESTIONS_FAILURE,
		error
	}
}

export function fetchQuestions() {
	//using thunk middleware here
	return function (dispatch) {
		dispatch(requestQuestions());
		return QuestionApi.fetchAll()
			.then((questions) => dispatch(receiveQuestions(questions)))
			.catch((err) => dispatch(rejectQuestions(err)))
	}
}

function requestPostQuestion() {
	return {
		type: ActionTypes.POST_QUESTION_REQUEST,
	}
}

function successPostQuestion() {
	return {
		type: ActionTypes.POST_QUESTION_SUCCESS,
	}
}
function rejectPostQuestion(error) {
	return {
		type: ActionTypes.POST_QUESTION_FAILURE,
		error
	}
}

export function addQuestion(question) {
	return function (dispatch) {
		dispatch(requestPostQuestion()); // init request, maybe add a loader
		return QuestionApi.postQuestion(question)
			.then((id)=>{
				console.log("posted question with id:", id);
				dispatch(successPostQuestion()); // show success hint to user
				dispatch(fetchQuestions())}) //refresh results
			.catch((err)=>dispatch(rejectPostQuestion(err))); // show err to user
	}
	
}