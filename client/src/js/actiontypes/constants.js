'use strict';

// fetching from API
export const INIT_REQUEST = 'INIT_REQUEST';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS'; // all
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS'; // single

export const REQUEST_FAILURE = 'REQUEST_FAILURE';

// showing status messages to the user
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';


// User interactions
// posting question to API
export const POST_QUESTION_REQUEST = 'POST_QUESTION_REQUEST';

// posting answer to API
export const POST_ANSWER_REQUEST = 'POST_ANSWER_REQUEST';

export const VOTE_ANSWER_REQUEST = 'VOTE_ANSWER_REQUEST';
// vote up/down

export const VOTE = 'VOTE';

//auth user interactions
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const FORWARD_TO = "FORWARD_TO";