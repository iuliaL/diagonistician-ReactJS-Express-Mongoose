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
	/* Checks if anybody is logged in
	 * @return {boolean} True if there is a logged in user, false if there isn't
	 */
	static loggedIn() {
		return !!localStorage.getItem('jwt');
	}
}