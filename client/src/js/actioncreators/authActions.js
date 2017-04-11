'use strict';

import * as ActionTypes from '../actiontypes/constants';
import { setErrorMessage, setSuccessMessage } from './messageActions';
import Auth from '../requests/auth';

import createBrowserHistory from 'history/createBrowserHistory' // this works like this
const history = createBrowserHistory();


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

function getUserDetails(details) {
	return {
		type: ActionTypes.USER_DETAILS,
		details
	}
}

export function login(username, password, history, newRoute) {
	return function (dispatch) {
		dispatch(initRequest()); // show spinner or something
		return Auth.login(username,password)
			.then((response) => {
				console.log('User logged in successfully', response);
				localStorage.setItem('jwt', response.token);
				dispatch(loginSuccess(Auth.loggedIn()));
				dispatch(requestUserDetails());
			})
			.then(() =>
				newRoute ? forwardTo(history, newRoute.from) : forwardTo(history, '/list')
			)
			.catch((err)=>dispatch(setErrorMessage(err.message)));
	}
}

export function requestUserDetails() {
	return function(dispatch){
		return Auth.getUserDetails()
			.then((user) => dispatch(getUserDetails(user)))
			.catch((err)=>dispatch(setErrorMessage(err.message)));
	}
}

export function logout(history) {
	return function (dispatch) {
		return Auth.logout()
			.then((res)=> {
				localStorage.removeItem('jwt');
				dispatch(logoutSuccess(Auth.loggedIn()));
				forwardTo(history,'/list');
				dispatch(setSuccessMessage(res.message));
			}).catch((err)=>dispatch(setErrorMessage(err.message)));
	}
}

export function register(user, history) {
	return function (dispatch) {
		dispatch(initRequest()); // show spinner or something
		return Auth.register(user)
			.then(()=> {
				dispatch(registerSuccess());
				forwardTo(history,'/login');
			})
			.catch((err)=> dispatch(setErrorMessage()));
	}
}

function forwardTo(history, pathname) {
	history.push(pathname);
}

