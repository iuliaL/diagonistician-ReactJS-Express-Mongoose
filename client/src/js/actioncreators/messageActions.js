import * as ActionTypes from '../actiontypes/constants';

/**
 * Sets the state successMessage
 */
function setSuccessMessage(message) {
	return (dispatch) => {
		dispatch({ type: ActionTypes.SET_SUCCESS_MESSAGE, message });
		// Remove the  message after 3 seconds
		setTimeout(() => {
			dispatch({ type: ActionTypes.SET_SUCCESS_MESSAGE, message: '' });
		}, 3000);
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

export {setErrorMessage,setSuccessMessage}