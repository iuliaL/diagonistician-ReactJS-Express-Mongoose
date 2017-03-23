'use strict';

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

export default function makeRequest(
		url,
		method = 'GET',
		payload,
		params,
	    headers = {"Content-type": "application/json"},
		credentials = 'include', // Don't forget to specify this if you need cookies
) {
		const options = { method, params, headers, credentials };
		if(payload){ options.body = JSON.stringify( payload)}
		console.log('fetch options',options);
			return fetch(url, options )
				.then(checkStatus)
				.then(result => result.json())
	}
