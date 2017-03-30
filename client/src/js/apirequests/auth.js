'use strict';
/*
 * Keeping API requests organized
 * */

import makeRequest from '../fetchHelper';

const path = '/auth';

export default class Auth{
	static login(user,pass){
		const credentials = btoa(`${user}:${pass}`);
		return makeRequest(`${path}/login`, "POST", null, null, { Authorization: `Basic ${credentials}`})
	}
	
	static register(user,pass){
	}
}