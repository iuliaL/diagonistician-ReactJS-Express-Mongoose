'use strict';

import * as ActionTypes from '../actiontypes/constants';
import Auth from '../requests/auth';

const initialState = {
	loggedIn: Auth.loggedIn(),
	user: {},
	successMessage: '',
	errorMessage: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_SUCCESS_MESSAGE: // add a hint that req was successful
			return {
				...state,
				successMessage: action.message
			};
		case ActionTypes.SET_ERROR_MESSAGE: // add a hint that req failed
			return {
				...state,
				errorMessage: action.message
			};
		case ActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: action.loggedIn
			};
		case ActionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				loggedIn: action.loggedIn,
				user: {}
			};
		
		case ActionTypes.USER_DETAILS:
			return {
				...state,
				user: action.details
			};
		default:
			return state;
	}
	
	
}