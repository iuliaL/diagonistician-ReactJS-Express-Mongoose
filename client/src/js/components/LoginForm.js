/**
 * Created by Iulia on 3/13/17.
 */
'use strict';

import React, { Component, PropTypes} from 'react';

//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actioncreators/authActions';

import { Redirect } from 'react-router';
import makeRequest from '../fetchHelper';


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
	logout = () => {
		let url = '/auth/logout';
		return makeRequest(url, "GET")
			.then((response)=> {
				console.log(response.message);
				localStorage.removeItem('jwt');
			})
			.catch((e)=> console.log('Could not logout user',e));
	};
	render(){
		const { redirect, errorMessage } = this.props;
		return (
			<div>
				{/*redirect if login success*/}
				{!!redirect && <Redirect to={redirect} />}
				
				<form className="question-form" onSubmit={this.onSubmit}>
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
							<input className="button-secondary ask-question-button" type="button" onClick={this.logout} value="Logout"/>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		redirect: state.redirect,
		errorMessage: state.errorMessage
	};
}

function mapDispatchedActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchedActionsToProps)(LoginForm)