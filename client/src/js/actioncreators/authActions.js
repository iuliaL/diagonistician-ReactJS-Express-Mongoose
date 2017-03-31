'use strict';

import * as ActionTypes from '../actiontypes/constants';
import { setErrorMessage, setSuccessMessage } from './messageActions';
import Auth from '../requests/auth';

function initRequest() {
	return {
		type: ActionTypes.INIT_REQUEST
	}
}

function registerSuccess() {
	return { type: ActionTypes.REGISTER_SUCCESS }
}

function loginSuccess(loggedIn) {
	return { type: ActionTypes.LOGIN_SUCCESS, loggedIn }
}
function logoutSuccess(loggedIn) {
	return { type: ActionTypes.LOGOUT_SUCCESS, loggedIn }
}

export function login(username, password) {
	return function (dispatch) {
		dispatch(initRequest()); // show spinner or something
		return Auth.login(username,password)
			.then((response) => {
				console.log('User logged in successfully', response);
				localStorage.setItem('jwt', response.token);
				dispatch(loginSuccess(Auth.loggedIn()));
			}).catch((err)=>dispatch(setErrorMessage(err.message)));
	}
}
export function logout() {
	return function (dispatch) {
		return Auth.logout()
			.then((res)=> {
				localStorage.removeItem('jwt');
				dispatch(logoutSuccess(Auth.loggedIn()));
				dispatch(setSuccessMessage(res.message));
			}).catch((err)=>dispatch(setErrorMessage(err.message)));
	}
}

export function register(username, password) {
	return function (dispatch) {
		dispatch(initRequest()); // show spinner or something
	}
}
