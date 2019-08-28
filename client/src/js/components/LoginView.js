/**
 * Created by Iulia on 3/13/17.
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actioncreators/authActions';

import LinkWrap from './LinkWrap';
import { Success, Error } from './Messages';

// Utils
import useInput from '../hooks/useInput';
import { submitBtnClasses } from '../dynamicStyles';

Login.propTypes = {
	loggedIn: PropTypes.bool,
	errorMessage: PropTypes.string,
	successMessage: PropTypes.string
};

function Login({ history, location, successMessage, errorMessage, loggedIn, actions: { login } }) {
	const { value: username, onChange: onUsernameChange } = useInput('');
	const { value: password, onChange: onPasswordChange } = useInput('');

	const onSubmit = (event) => {
		event.preventDefault();
		const trimmedUsername = username.trim();
		if (!trimmedUsername || !password) {
			alert('Please type username and password!');
			return;
		}
		login(username, password, history, location.state);
		// redirect to /list or back from where user arrived on this route
	};


	return (
		<form className="form" onSubmit={onSubmit}>
			{/*if you accidentally arrive on this route go to homepage */}
			{loggedIn && <Redirect to="/list" />}

			<h1>Login</h1>
			<Error msg={errorMessage} />
			<Success msg={successMessage} />

			<div className="grid-parent">
				<div className="grid-100">
					<input type="text" placeholder="Username"
						value={username}
						name="username"
						onChange={onUsernameChange}
					/>
					<input type="password" placeholder="Password"
						value={password}
						name="password"
						onChange={onPasswordChange}
					/>
					<input className={submitBtnClasses(!username || !password)} type="submit" value="Login" />
					<span className="pull-right" style={{ marginTop: 15 }}>
						Don't have an account yet?
						&nbsp;
							<LinkWrap to="/register">Sign up</LinkWrap>
					</span>
				</div>
			</div>
		</form>
	)

}

function mapStateToProps({ auth, messages }) {
	return {
		loggedIn: auth.loggedIn,
		errorMessage: messages.errorMessage,
		successMessage: messages.successMessage
	};
}

function mapDispatchedActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchedActionsToProps)(Login)