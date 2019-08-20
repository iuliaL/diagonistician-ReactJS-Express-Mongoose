'use strict';

import * as ActionTypes from '../actiontypes/constants';

const initialState = {
	questions: [],
	question: {},
	loading: false
};

export default function (state = initialState, action) {
	// make a COPY to the actual state (immutability) and merge it with the next questions
	switch (action.type) {
		case ActionTypes.INIT_REQUEST:
			return {
				...state,
				loading: action.loading
			};
		case ActionTypes.FETCH_QUESTIONS_SUCCESS:
			return {
				...state,
				questions: action.questions,
				loading: action.loading
			};
		case ActionTypes.FETCH_QUESTION_SUCCESS: // (single)
			return {
				...state,
				question: action.question,
			};

		default:
			return state;
	}
}