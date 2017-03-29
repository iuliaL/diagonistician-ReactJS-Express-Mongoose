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
		// this function is unhandled for now
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

export function addQuestion(question) {
	return function (dispatch) {
		dispatch(requestPostQuestion()); // init request, maybe add a loader
		return QuestionApi.postQuestion(question)
			.then((id)=>{
				console.log("posted question with id:", id);
				dispatch(setSuccessMessage('Question was asked successfully!')); // show success hint to user
				dispatch(fetchQuestions())}) //refresh results
			.catch((err)=>{
				console.log(err,'err');
				dispatch(setErrorMessage(err.message))
		}); // show err to user
	}
}

/**
 * Sets the state successMessage
 */
function setSuccessMessage(message) {
	return (dispatch) => {
		dispatch({ type: ActionTypes.SET_SUCCESS_MESSAGE, message });
		// Remove the  message after 3 seconds
		setTimeout(() => {
			dispatch({ type: ActionTypes.SET_SUCCESS_MESSAGE, message: '' });
		}, 3000);
	}
}

/**
 * Sets the state errorMessage
 */
function setErrorMessage(message) {
	return (dispatch) => {
		dispatch({ type: ActionTypes.SET_ERROR_MESSAGE, message });
		// Remove the  message after 3 seconds
		setTimeout(() => {
			dispatch({ type: ActionTypes.SET_ERROR_MESSAGE, message: '' });
		}, 3000);
	}
}
