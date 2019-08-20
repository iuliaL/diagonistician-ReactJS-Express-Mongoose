'use strict';

import * as ActionTypes from '../actiontypes/constants';

const initialState = {
	successMessage: '',
	errorMessage: ''
};

export default function (state = initialState, action) {
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
		default:
			return state;
	}


}