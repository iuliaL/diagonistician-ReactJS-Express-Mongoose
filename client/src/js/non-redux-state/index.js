/* Functions for stateful components
 * functional setState() react only
 * */

const textAreaChangeStateHandler = (event) => {
	event.persist();
	if (event.target.value.length > 140) {
		return ({ tooLong: true });
	}
	return state => ({ // new state object
		text: event.target.value.length > 140 ? state.text : event.target.value,
		charLeft: state.charLeft >= -1 ? 140 - event.target.value.length : 0,
		tooLong: false
	});
};

export default textAreaChangeStateHandler;