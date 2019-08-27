/**
 * Created by Iulia on 3/13/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actioncreators/authActions';

// components
import { Error, Success } from './Messages';
import LinkWrap from './LinkWrap';

// utils
import { submitBtnClasses } from '../dynamicStyles';

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.register = props.actions.register;
	}
	static propTypes = {
		loggedIn: PropTypes.bool,
		errorMessage: PropTypes.string,
		actions: PropTypes.object,
		history: PropTypes.object
	};
	state = { username: '', password: '', confirmPassword: '' };
	onInputChange = (event) => {
		const what = event.target.name;
		this.setState({
			[what]: event.target.value
		})
	};
	onSubmit = (event) => {
		event.preventDefault();
		let { username, password, confirmPassword } = this.state;
		password = password.trim();
		confirmPassword = confirmPassword.trim();
		if (!username || !password || !confirmPassword) {
			alert('Please type username and password!');
			return;
		}
		if (confirmPassword != password) {
			alert('Passwords don\'t match!');
			return;
		}
		this.register({ username, password, confirmPassword }, this.props.history);
	};
	componentWillUnmount() {
		this.setState({ username: '', password: '', confirmPassword: '' });
	}
	render() {
		const { errorMessage, successMessage, loggedIn } = this.props;
		return (
			<form className="form" onSubmit={this.onSubmit}>
				{loggedIn && <Redirect to="/list" />}

				<h1>Sign up</h1>
				<Error msg={errorMessage} />
				<Success msg={successMessage} />

				<div className="grid-parent">
					<div className="grid-100">
						<input type="text" placeholder="Username"
							value={this.state.username} name="username"
							onChange={this.onInputChange}
						/>
						<input type="password" placeholder="Password"
							value={this.state.password}
							name="password" onChange={this.onInputChange}
						/>
						<input type="password" placeholder="Confirm Password"
							value={this.state.confirmPassword}
							name="confirmPassword" onChange={this.onInputChange}
						/>
						<input className={submitBtnClasses(!this.state.username
							|| !this.state.password
							|| !this.state.confirmPassword)}
							type="submit" value="Sign Up" />
						<span className="pull-right" style={{ marginTop: 15 }}>Already have an account?
							&nbsp;<LinkWrap to="/login">Login</LinkWrap>
						</span>

					</div>

				</div>
			</form>
		)
	}
}

function mapStateToProps({ messages, auth }) {
	return {
		errorMessage: messages.errorMessage,
		successMessage: messages.successMessage,
		loggedIn: auth.loggedIn
	};
}

function mapDispatchedActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchedActionsToProps)(RegisterForm)