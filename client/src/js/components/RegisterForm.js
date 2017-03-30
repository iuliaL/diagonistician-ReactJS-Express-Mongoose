/**
 * Created by Iulia on 3/13/17.
 */
import React, {Component, PropTypes} from 'react';
import { withRouter } from 'react-router';

//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actioncreators/questionActions';

import makeRequest from '../fetchHelper';


class RegisterForm extends Component{
	static propTypes = {
		route: PropTypes.shape({
			onAdd: PropTypes.func.isRequired
			})
	};
	state = { username : '', password: '', confirmPassword: ''};
	onInputChange = (event) => {
		//console.log('Typing ... ', event.target.value);
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
		if ( confirmPassword != password) {
			alert('Passwords don\'t match!');
			return;
		}
		this.props.onAdd({ username, password });
		this.login({ username, password, confirmPassword })
			//TODO redirect after register
			.then(()=>console.log("Redirect me to questions"));
		this.setState({ username : '', password: '', confirmPassword: ''});
	};
	login = (user) => {
		const url = 'http://localhost:8080/auth/register';
		return makeRequest(url, "POST", user)
			.then((response)=> console.log('User created', response))
			.catch((e)=> console.log('Could not create user', e));
	};
	render(){
		return (
			<form className="question-form" onSubmit={this.onSubmit}>
				<h1>Sign up</h1>
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
						<input className="button-primary ask-question-button" type="submit" value="Register"/>
					</div>
				</div>
			</form>
		)
	}
}

function mapStateToProps(state) {
	return {
		successMessage: state.successMessage,
		errorMessage: state.errorMessage
	};
}

function mapDispatchedActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchedActionsToProps)(RegisterForm)