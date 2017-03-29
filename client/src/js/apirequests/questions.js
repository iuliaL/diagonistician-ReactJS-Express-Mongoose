'use strict';
/*
* Keeping API requests organized
* */

import makeRequest from '../fetchHelper';

const path = '/api/questions';

export default class QuestionApi {
	static fetchAll(){
		return makeRequest(path)
	}
	static postQuestion(q){
		return makeRequest(path,"POST", q)
	}
}
