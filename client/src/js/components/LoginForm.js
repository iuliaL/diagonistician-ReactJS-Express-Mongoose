/**
 * Created by Iulia on 3/13/17.
 */
'use strict';

import React, { Component, PropTypes} from 'react';

//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actioncreators/authActions';

import { withRouter, Redirect } from 'react-router';
import makeRequest from '../fetchHelper';

import createBrowserHistory from 'history/createBrowserHistory' // this works like this
const history = createBrowserHistory();


class LoginForm extends Component{
	static propTypes = {
		route: PropTypes.shape({
			onAdd: PropTypes.func.isRequired
		}),
		redirect: PropTypes.string,
		errorMessage: PropTypes.string
	};
	state = { username : '', password: ''};
	login = this.props.actions.login;
	
	onInputChange = (event) => {
		const what = event.target.name;
		this.setState({
			[what]: event.target.value
		})
	};
	onSubmit = (event) => {
		event.preventDefault();
		const username = this.state.username.trim();
		const password = this.state.password;
		if (!username || !password) {
			alert('Please type username and password!');
			return;
		}
		this.login(username, password);
	};
	getUserDetails = (token) => {
		const url = 'http://localhost:8080/auth/user-details';
		return makeRequest(url, "GET", null, null, {Authorization: `Bearer ${token}` })
			.then((reply)=> reply.user)
			.catch((err)=>'couldn\'t get user data');
	};

	render(){
		const { errorMessage, loggedIn } = this.props;
		console.log(errorMessage,loggedIn,'history',history);
		return (
			<form className="question-form" onSubmit={this.onSubmit}>
				{loggedIn && <Redirect to="/list"/>}
				<h1>Login</h1>
				{!!errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
				
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
						<input className="button-primary ask-question-button" type="submit" value="Login"/>
					</div>
				</div>
			</form>
		)
	}
}

function mapStateToProps(state) {
	return {
		loggedIn: state.loggedIn,
		errorMessage: state.errorMessage
	};
}

function mapDispatchedActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchedActionsToProps)(LoginForm))