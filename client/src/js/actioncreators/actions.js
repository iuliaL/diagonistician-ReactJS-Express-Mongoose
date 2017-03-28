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
		return makeRequest('http://localhost:8080/api/questions')
			.then((questions) => dispatch(receiveQuestions(questions)))
			.catch((err) => dispatch(rejectQuestions(err)))
	}
}



export function addQuestion(question) {
	console.log('got question', question);
	return {
		type: ActionTypes.ADD_QUESTION,
		text: question.text,
		createdAt: question.createdAt
	}
}