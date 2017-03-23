/**
 * Created by Iulia on 3/13/17.
 */
'use strict';

import React, { Component, PropTypes} from 'react';
import { withRouter } from 'react-router';
import makeRequest from '../fetchHelper';


class RegisterForm extends Component{
	static propTypes = {
		route: PropTypes.shape({
			onAdd: PropTypes.func.isRequired
		})
	};
	state = { username : '', password: ''};
	onInputChange = (event) => {
		//console.log('Typing ... ', event.target.value);
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
		this.props.onAdd({ username, password });
		this.postNewUser({ username, password })
		//TODO redirect after login
			.then(()=>console.log("Redirect me to questions"));
		//this.setState({ username : '', password: ''});
	};
	postNewUser = (user) => {
		const url = 'http://localhost:8080/auth/login';
		return makeRequest(url, "POST", user)
			.then((response)=> console.log('User created', response))
			.catch((e)=> console.log('Could not create user',e));
	};
	render(){
		return (
			<form className="question-form" onSubmit={this.onSubmit}>
				<h1>Login</h1>
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

export default withRouter(RegisterForm)