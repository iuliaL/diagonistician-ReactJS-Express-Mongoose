'use strict';

import * as ActionTypes from '../actiontypes/constants';
import { setErrorMessage, setSuccessMessage } from './messageActions';
import QuestionApi from '../requests/questions';

function initRequest() {
	return {
		type: ActionTypes.INIT_REQUEST,
		loading: true
	}
}

function receivedQuestions(questions) {
	return {
		type: ActionTypes.FETCH_QUESTIONS_SUCCESS,
		questions,
		loading: false
	}
}

function requestFail(error) {
	return {
		type: ActionTypes.REQUEST_FAILURE,
		error,
		loading: false
		// this function is unhandled for now
	}
}

export function fetchQuestions() {
	//using thunk middleware here
	return function (dispatch) {
		dispatch(initRequest());
		return QuestionApi.fetchAll()
			.then(questions => dispatch(receivedQuestions(questions)))
			.catch((err) => dispatch(requestFail(err)))
	}
}
function receivedQuestion(question) { // carry the question => reducer
	return {
		type: ActionTypes.FETCH_QUESTION_SUCCESS,
		question
	}
}
export function fetchOne(id) {
	return function (dispatch) {
		dispatch(initRequest());
		return QuestionApi.fetchOne(id)
			.then((q) => dispatch(receivedQuestion(q)))
			.catch((err) => dispatch(requestFail(err)))
	}
}

function requestPostQuestion() {
	return {
		type: ActionTypes.POST_QUESTION_REQUEST,
	}
}
function requestPostAnswer() {
	return {
		type: ActionTypes.POST_ANSWER_REQUEST,
	}
}
function requestVoteAnswer() {
	return {
		type: ActionTypes.VOTE_ANSWER_REQUEST,
	}
}

export function addQuestion(question) {
	return function (dispatch) {
		dispatch(requestPostQuestion()); // init request, maybe add a loader
		return QuestionApi.postQuestion(question)
			.then((id) => {
				console.log("posted question with id:", id);
				dispatch(setSuccessMessage('Question was asked successfully!')); // show success hint to user
				dispatch(fetchQuestions())
			}) //refresh results
			.catch((err) => {
				console.log(err, 'err');
				dispatch(setErrorMessage(err.message))
			}); // show err to user
	}
}
export function addAnswer(questionId, answer) {
	return function (dispatch) {
		dispatch(requestPostAnswer()); // init request, maybe add a loader
		return QuestionApi.postAnswer(questionId, answer)
			.then((id) => {
				console.log("posted answer with id:", id);
				dispatch(setSuccessMessage('Answer was added successfully!')); // show success hint to user
				dispatch(fetchOne(questionId))
			}) //refresh question
			.catch((err) => {
				console.log(err.message, 'err');
				dispatch(setErrorMessage(err.message))
			}); // show err to user
	}
}

export function voteAnswer(questionId, answerId, arg) {
	return function (dispatch) {
		dispatch(requestVoteAnswer()); // init request, maybe add a loader
		return QuestionApi.voteAnswer(questionId, answerId, arg)
			.then((voted) => {
				const msgToShow = voted.voteDirection[0].toUpperCase() + voted.voteDirection.slice(1);
				dispatch(setSuccessMessage(msgToShow + 'voted successfully!')); // show success hint to user
				dispatch(fetchOne(questionId))
			}) //refresh question
			.catch((err) => {
				console.log(err, 'err');
				dispatch(setErrorMessage(err.message))
			}); // show err to user
	}
}

