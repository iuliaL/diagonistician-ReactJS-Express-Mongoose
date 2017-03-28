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
	switch (action.type){
		case ActionTypes.FETCH_QUESTIONS_SUCCESS:
			return {
				...state,
				questions: action.questions
			};
		
		
		case ActionTypes.ADD_QUESTION:
			const updates = {
				questions: [
					...state.questions,
					{
						text: action.text,
						created: action.createdAt
					}
				]
			};
			// make a COPY to the actual state (immutability) and merge it with the next questions
			return Object.assign({}, state, updates);
		// return {...state, players: updates}
		default:
			return state;
	}
}