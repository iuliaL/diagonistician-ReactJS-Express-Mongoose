'use strict';
/*
* Keeping API requests organized
* */

import makeRequest from '../fetchHelper';

const path = '/api/questions';

export default class QuestionApi {
	static fetchAll() {
		return makeRequest(path)
	}
	static fetchOne(id) {
		return makeRequest(`${path}/${id}`)
	}
	static postQuestion(q) {
		return makeRequest(path, "POST", q)
	}
	static postAnswer(qId, answer) {
		return makeRequest(`${path}/${qId}/answers`, "POST", answer); // answer = {text: '...'}
	}
	static voteAnswer(questionId, answerId, arg) { // arg is either 'up' or 'down'
		return makeRequest(`${path}/${questionId}/answers/${answerId}/vote-${arg}`, "POST");
	}
}
