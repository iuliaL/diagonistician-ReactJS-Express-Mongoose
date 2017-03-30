'use strict';

import * as ActionTypes from '../actiontypes/constants';
import Auth from '../apirequests/auth';

function initRequest() {
	return {
		type: ActionTypes.INIT_REQUEST
	}
}

function registerSuccess() {
	return { type: ActionTypes.REGISTER_SUCCESS }
}

function loginSuccess(redirect) {
	return { type: ActionTypes.LOGIN_SUCCESS, redirect }
}

export function login(username, password) {
	return function (dispatch) {
		dispatch(initRequest()); // show spinner or something
		return Auth.login(username,password)
			.then((response) => {
				console.log('User logged in successfully', response);
				localStorage.setItem('jwt', response.token);
				dispatch(loginSuccess('/list'))
			}).catch((err)=>dispatch(setErrorMessage(err.message)));
	}
}

export function register(username, password) {
	return function (dispatch) {
		dispatch(initRequest()); // show spinner or something
		
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