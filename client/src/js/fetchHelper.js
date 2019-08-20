'use strict';

const baseUrl = 'http://localhost:8081';

/* fetch Promise checkStatus */

function checkStatus(res) {
	if (res.status >= 200 && res.status < 300) {
		return Promise.resolve(res);
	} else {
		let error = new Error(res.statusText);
		error.response = res;
		return Promise.reject(error);
	}
}

const makeRequest = function (
	url,
	method = 'GET',
	payload,
	params,
	headers,
	credentials = 'include'
) {
	const options = { method, params, headers, credentials };
	options.headers = { ...options.headers, "Content-type": "application/json" };

	// check for client token (logged in) and add it to req header
	if (localStorage.getItem('jwt')) {
		options.headers = {
			...options.headers,
			"Authorization": `Bearer ${localStorage.getItem('jwt')}`
		}
	}
	if (payload) { options.body = JSON.stringify(payload) }
	console.log('fetch call url, options', url, options);
	return fetch(`${baseUrl}${url}`, options)
		.then(checkStatus)
		.then(result => result.json())
};

export default makeRequest;
