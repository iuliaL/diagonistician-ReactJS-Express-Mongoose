'use strict';

import * as ActionTypes from '../actiontypes/constants';
import makeRequest from '../fetchHelper';

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
		return makeRequest('/api/questions')
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
	console.log('got question', question);
	return function (dispatch) {
		dispatch(requestPostQuestion()); // init request, maybe add a loader
		return makeRequest('/api/questions',"POST", question)
			.then((id)=>{console.log("posted question with id:", id);
				dispatch(fetchQuestions())}) //refresh results
			.catch((err)=>dispatch(rejectPostQuestion(err)))
	}
	
}