'use strict';

import * as ActionTypes from '../actiontypes/constants';

const initialState = {
	questions: [],
	question: {},
	loading: false
};

export default function (state = initialState, action) {
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
				loading: action.loading
			};

		default:
			return state;
	}
}