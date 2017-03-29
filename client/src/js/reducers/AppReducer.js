'use strict';

import * as ActionTypes from '../actiontypes/constants';
import auth from '../login/auth';

// The initial application state
const initialState = {
	questions : [],
	formState: {
		username: '',
		password: ''
	},
	loggedIn: auth.loggedIn(),
	errorMessage: ''
};

export default function(state = initialState, action) {
	// make a COPY to the actual state (immutability) and merge it with the next questions
	switch (action.type){
		case ActionTypes.FETCH_QUESTIONS_SUCCESS:
			return {
				...state,
				questions: action.questions
			};
		
		case ActionTypes.POST_QUESTION_SUCCESS: // add a hint that post was successful maybe
				return {
					...state
				};
		default:
			return state;
	}
}