import makeRequest from '../fetchHelper';

const auth = {
	/**
	 * Logs a user in
	 * @param  {string}   username The username of the user
	 * @param  {string}   password The password of the user
	 * @param  {Function} callback Called after a user was logged in on the remote server
	 */
	// login(username, password, callback) {
	// 	// If there is a token in the localStorage, the user already is
	// 	// authenticated
	// 	if (this.loggedIn()) {
	// 		callback(true);
	// 		return;
	// 	}
	// 	// Post a fake request (see below)
	// 	request.post('/login', { username, password }, (response) => {
	// 		// If the user was authenticated successfully, save a random token to the
	// 		// localStorage
	// 		if (response.authenticated) {
	// 			localStorage.token = response.token;
	// 			callback(true);
	// 		} else {
	// 			// If there was a problem authenticating the user, show an error on the
	// 			// form
	// 			callback(false, response.error);
	// 		}
	// 	});
	// },
	/**
	 * Logs the current user out
	 */
	logout() {
		const url = '/auth/logout';
		return makeRequest(url, "GET")
			.then((response)=> {
				console.log(response.message);
				localStorage.removeItem('jwt');
			})
			.catch((e)=> console.log('Could not logout user',e));
	},
	/**
	 * Checks if anybody is logged in
	 * @return {boolean} True if there is a logged in user, false if there isn't
	 */
	loggedIn() {
		return !!localStorage.getItem('jwt');
	},
	/**
	 * Registers a user in the system
	 * @param  {string}   username The username of the user
	 * @param  {string}   password The password of the user
	 * @param  {Function} callback Called after a user was registered on the remote server
	 */
	// register(username, password, callback) {
	// 	// Post a fake request
	// 	request.post('/register', { username, password }, (response) => {
	// 		// If the user was successfully registered, log them in
	// 		if (response.registered === true) {
	// 			this.login(username, password, callback);
	// 		} else {
	// 			// If there was a problem registering, show the error
	// 			callback(false, response.error);
	// 		}
	// 	});
	// },
	onChange() {}
};

export default auth;
